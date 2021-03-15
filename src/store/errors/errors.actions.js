import types from './errors.types';

export function setError(message) {
  return { type: types.SET_ERROR, payload: { message } };
}

export function removeError() {
  return { type: types.REMOVE_ERROR };
}

export default {
  setError,
  removeError,
};
