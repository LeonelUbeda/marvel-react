import types from './characters.types';
import {
  buildCharactersURL,
  buildCharacterDetail,
} from '../../utils/urlBuilders';
import { getRequest } from '../../utils/store';
import { setError } from '../errors/errors.actions';

import {
  getItemsFromAPIResponse,
  getItemsIdsFromAPIResponse,
} from '../../utils/api';

export function setCurrent(current) {
  return { type: types.SET_CURRENT, payload: current };
}

function setLoadingTo(payload) {
  return { type: types.SET_IS_LOADING, payload };
}

export function setRequest(request) {
  return (dispatch, getState) => {
    const { requests } = getState().comics;
    const search = getRequest(requests, request.params);
    if (!search) {
      dispatch({ type: types.SET_REQUEST, payload: request });
    }
  };
}

export function setListingParams({ page, limit, filters }) {
  return async (dispatch, getState) => {
    const { requests } = getState().characters;
    try {
      const request = getRequest(requests, { ...filters, page, limit });
      if (request) {
        dispatch(setCurrent(request));
      } else {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: true,
        });
        let response = await fetch(
          buildCharactersURL({ ...filters, limit, offset: limit * (page - 1) })
        );
        response = await response.json();
        const itemsObj = getItemsFromAPIResponse(response);
        dispatch({
          type: types.SET_ITEMS,
          payload: itemsObj,
        });

        const itemsIds = getItemsIdsFromAPIResponse(response);
        const requestObj = {
          items: itemsIds,
          params: { ...filters, limit, page },
          total: response.data.total,
        };
        dispatch(setRequest(requestObj));
        dispatch(setCurrent(requestObj));
      }
    } catch (error) {
      dispatch(setError('Application Error'));
    } finally {
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
  };
}

export function loadCharacterById(id) {
  return async (dispatch, getState) => {
    const { items } = getState().characters;
    if (!(id in items)) {
      dispatch(setLoadingTo(true));
      try {
        let response = await fetch(buildCharacterDetail(id));
        response = await response.json();
        if (response.code === 404) {
          dispatch(setError('Element not found'));
        } else {
          const itemsObj = getItemsFromAPIResponse(response);
          dispatch({
            type: types.SET_ITEMS,
            payload: itemsObj,
          });
        }
      } catch (error) {
        dispatch(setError('Application Error'));
      } finally {
        dispatch(setLoadingTo(false));
      }
    }
  };
}

export default {
  setListingParams,
  loadCharacterById,
};
