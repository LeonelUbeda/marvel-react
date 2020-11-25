import React, {createContext, useReducer} from 'react';

const initialState = [];
export const store = createContext(initialState);
const { Provider } = store;

export const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'ADD':
                return [
                    ...state,
                    action.payload
                ]
            case 'REMOVE':
                return state.filter(e => e.id !== action.payload.id && e.type !== action.payload.type)
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
