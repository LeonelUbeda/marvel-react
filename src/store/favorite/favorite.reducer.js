import types from './favorite.types';

const initialState = { favorites: [], isLoading: false, error: false };

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
          ),
        ],
      };
    case types.LOADING_FAVORITES:
      return { ...state, isLoading: true };
    case types.LOADING_SUCCESS:
      return { ...state, favorites: payload, isLoading: false };
    case types.LOADING_FAVORITES_ERROR:
      return { ...state, isLoading: false, error: true };
    case types.ADD_ERROR:
      return { ...state, error: true };
    case types.REMOVE_ERROR:
      return { ...state, error: false };
    default:
      return state;
  }
}

export default reducer;
