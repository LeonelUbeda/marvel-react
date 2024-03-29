import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import favoriteReducer from './favorite/favorite.reducer';
import comicsReducer from './comics/comics.reducer';
import charactersReducer from './characters/characters.reducer';
import errorsReducer from './errors/errors.reducer';

const combinedReducers = combineReducers({
  favorite: favoriteReducer,
  comics: comicsReducer,
  characters: charactersReducer,
  errors: errorsReducer,
});

export default createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
