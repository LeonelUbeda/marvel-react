import types from './favorite.types';

const initialState = { favorites: [] };

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, payload] };
    case types.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter(
            (item) => item.id !== payload.id && item.type !== payload.type
          )]
      };
    case types.LOAD_ALL:
      return { ...state, favorites: payload };
    default:
      return state;
  }
}

export default reducer;
