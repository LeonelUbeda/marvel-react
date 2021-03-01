import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { loadAllFavorites } from './store/favorite/favorite.actions';
import './tailwind.css';
import store from './store/index';
import Home from './pages/Home';
import Comics from './pages/Comics';
import ComicDetail from './pages/ComicDetail';
import Characters from './pages/Characters';
import Nav from './layout/Nav';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllFavorites());
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/comics" exact component={Comics} />
          <Route path="/comics/:id" exact component={ComicDetail} />
          <Route path="/characters" exact component={Characters} />
          <Route path="/characters/:id" exact component={CharacterDetail} />
          <Route path="/saved" exact component={Favorites} />
        </Switch>
      </div>
      <div className="fixed inset-x-0 bottom-0 container mx-auto">
        <Nav />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
