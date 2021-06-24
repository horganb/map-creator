import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  HashRouter,
} from 'react-router-dom';
import Editor from './Editor';
import Home from './Home';
import Viewer from './Viewer';

const prefix = '/map-creator';

const App = () => {
  return (
    <HashRouter basename={prefix}>
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route path={'/maps/:mapId/view'}>
          <Viewer />
        </Route>
        <Route path={'/maps/:mapId'}>
          <Editor />
        </Route>
        <Redirect to={'/'} />
      </Switch>
    </HashRouter>
  );
};

export default App;
