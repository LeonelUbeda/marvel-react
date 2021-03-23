import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../comics/comics.types';
import errorTypes from '../errors/errors.types';
import { loadComicById, setListingParams } from '../comics/comics.actions';
import { comicsListing, comicDetail } from '../../mocks/data/comicsData';
import {
  getItemsFromAPIResponse,
  getItemsIdsFromAPIResponse,
} from '../../utils/api';
import { apiResponseToHistory } from '../../utils/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('comics actions', () => {
  it('load a comic detail successfully ', () => {
    const expectedActions = [
      { type: types.SET_IS_LOADING, payload: true },
      { type: types.SET_ITEMS, payload: getItemsFromAPIResponse(comicDetail) },
      { type: types.SET_IS_LOADING, payload: false },
    ];

    const store = mockStore({ comics: { items: {} } });

    return store.dispatch(loadComicById(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch and error if comic detail not found', () => {
    const expectedActions = [
      { type: types.SET_IS_LOADING, payload: true },
      { type: errorTypes.SET_ERROR, payload: { message: 'Element not found' } },
      { type: types.SET_IS_LOADING, payload: false },
    ];

    const store = mockStore({ comics: { items: {} }, errors: { error: null } });

    return store.dispatch(loadComicById(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should load multiples comics', () => {
    const params = { page: 1, limit: 20, filters: {} };
    const history = apiResponseToHistory(comicsListing, params);
    const expectedActions = [
      { type: types.SET_IS_LOADING, payload: true },
      {
        type: types.SET_ITEMS,
        payload: getItemsFromAPIResponse(comicsListing),
      },
      { type: types.SET_REQUEST, payload: history },
      { type: types.SET_CURRENT, payload: history },
      { type: types.SET_IS_LOADING, payload: false },
    ];
    const store = mockStore({
      comics: { items: {}, requests: [] },
    });
    return store.dispatch(setListingParams(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
