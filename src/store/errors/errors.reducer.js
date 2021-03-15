import types from './errors.types';

const initialState = {
  error: null,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SET_ERROR:
      return { ...state, error: payload };
    case types.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

export default reducer;
