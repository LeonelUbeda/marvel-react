import localforage from 'localforage';
import favoriteTypes from './favorite.types';

function addFavorite(element) {
  return async (dispatch) => {
    try {
      dispatch({ type: favoriteTypes.ADD_ERROR });
      await localforage.setItem(`${element.type}-${element.id}`, element);
      dispatch({
        type: favoriteTypes.ADD_FAVORITE,
        payload: element,
      });
    } catch (error) {
      dispatch({ type: favoriteTypes.ADD_ERROR });
    }
  };
}

function removeFavorite(id, type) {
  return async (dispatch) => {
    try {
      await localforage.removeItem(`${type}-${id}`);
      dispatch({
        type: favoriteTypes.REMOVE_FAVORITE,
        payload: { id, type },
      });
    } catch (error) {
      dispatch({ type: favoriteTypes.ADD_ERROR });
    }
  };
}

export function loadAllFavorites() {
  return async (dispatch) => {
    try {
      dispatch({ type: favoriteTypes.LOADING_FAVORITES });
      const keys = await localforage.keys();
      let items = keys.map((e) => localforage.getItem(e));
      items = await Promise.all(items);
      dispatch({
        type: favoriteTypes.LOADING_SUCCESS,
        payload: items,
      });
    } catch (error) {
      dispatch({ type: favoriteTypes.ADD_ERROR });
    }
  };
}

function removeError() {
  return { type: favoriteTypes.REMOVE_ERROR };
}

export default {
  addFavorite,
  removeFavorite,
  loadAllFavorites,
  removeError,
};
