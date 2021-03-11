import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import favoriteReducer from './favorite/favorite.reducer';
import comicsReducer from './comics/comics.reducer';

const combinedReducers = combineReducers({
  favorite: favoriteReducer,
  comics: comicsReducer,
});

export default createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
