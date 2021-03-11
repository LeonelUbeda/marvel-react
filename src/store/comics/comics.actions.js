import types from './comics.types';
import { buildComicsURL } from '../../utils/urlBuilders';
import { getRequest } from '../../utils/store';
import {
  getItemsFromAPIResponse,
  getItemsIdsFromAPIResponse,
} from '../../utils/api';

export function setCurrent(current) {
  return { type: types.SET_CURRENT, payload: current };
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

export function setParams({ page, limit, filters }) {
  return async (dispatch, getState) => {
    const { requests } = getState().comics;
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
          buildComicsURL({ ...filters, limit, offset: limit * (page - 1) })
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
      dispatch({
        type: types.SET_ERROR,
        payload: { message: 'Application Error' },
      });
    } finally {
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
  };
}
export default {
  setParams,
};
