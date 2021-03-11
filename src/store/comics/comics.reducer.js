import types from './comics.types';

const initialState = {
  items: {},
  requests: [],
  currentRequest: {
    items: [],
    total: 0,
    params: {},
  },
  isLoading: false,
  error: null,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SET_ITEMS:
      return {
        ...state,
        items: { ...state.items, ...payload },
      };
    case types.SET_CURRENT:
      return { ...state, currentRequest: payload };
    case types.SET_REQUEST:
      return { ...state, requests: [...state.requests, payload] };
    case types.SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case types.SET_ERROR:
      return { ...state, error: payload };
    case types.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

export default reducer;
