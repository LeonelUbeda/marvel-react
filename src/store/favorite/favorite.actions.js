import localforage from 'localforage';
import favoriteTypes from './favorite.types';

function addFavorite(element) {
  return async (dispatch) => {
    await localforage.setItem(
      `${element.type}-${element.id}`,
      element
    );
    dispatch({
      type: favoriteTypes.ADD_FAVORITE,
      payload: element
    });
  };
}

function removeFavorite(id, type) {
  return async (dispatch) => {
    await localforage.removeItem(`${type}-${id}`);
    dispatch({
      type: favoriteTypes.REMOVE_FAVORITE,
      payload: { id, type }
    });
  };
}

export function loadAllFavorites() {
  return async (dispatch) => {
    const keys = await localforage.keys();
    let items = keys.map((e) => localforage.getItem(e));
    items = await Promise.all(items);
    dispatch({
      type: favoriteTypes.LOAD_ALL,
      payload: items
    });
  };
}

export default {
  addFavorite,
  removeFavorite,
  loadAllFavorites
};
