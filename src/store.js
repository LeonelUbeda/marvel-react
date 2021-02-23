import React, { createContext, useReducer } from 'react';
import localforage from 'localforage';

const initialState = [];
export const store = createContext(initialState);
const { Provider } = store;

export const StateProvider = ({ children }) => {
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'INITIALIZE':
        return action.payload;
      case 'ADD':
        localforage.setItem(
          `${action.payload.type}-${action.payload.id}`,
          action.payload
        );
        return [...state, action.payload];
      case 'REMOVE':
        localforage.removeItem(`${action.payload.type}-${action.payload.id}`);
        return state.filter(
          (e) => e.id !== action.payload.id && e.type !== action.payload.type
        );
      default:
        throw new Error();
    }
  }, initialState);

  // eslint-disable-next-line react/jsx-filename-extension
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
