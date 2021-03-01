import favoriteTypes from './favorite.types';

function addFavorite(element) {
  return {
    type: favoriteTypes.ADD_FAVORITE,
    payload: element
  };
}

function removeFavorite(id, type) {
  return {
    type: favoriteTypes.REMOVE_FAVORITE,
    payload: { id, type }
  };
}

export default {
  addFavorite,
  removeFavorite
};
