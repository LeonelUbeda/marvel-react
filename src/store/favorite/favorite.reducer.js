import types from './favorite.types';

const initialState = { favorites: [], isLoading: false, error: null };

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
      return {
        ...state,
        isLoading: false,
        error: { message: payload.message },
      };
    case types.ADD_ERROR:
      return { ...state, error: { message: payload.message } };
    case types.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

export default reducer;
