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

console.log('got app');

const prefix = '/map-creator';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={`${prefix}/`}>
          <Home />
        </Route>
        <Route path={`${prefix}/maps/:mapId`}>
          <Editor />
        </Route>
        <Redirect to={`${prefix}/`} />
      </Switch>
    </Router>
  );
};

export default App;
