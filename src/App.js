import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Editor from './Editor';
import Home from './Home';

export const getPath = path => `${prefix}${path}`;

const prefix = '/map-creator';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={getPath('/')}>
          <Home />
        </Route>
        <Route path={getPath('/maps/:mapId')}>
          <Editor />
        </Route>
        <Redirect to={getPath('/')} />
      </Switch>
    </Router>
  );
};

export default App;
