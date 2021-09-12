import './App.css';
import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import Editor from './Editor';
import Home from './Home';

const App = () => {
  return (
    <HashRouter basename={'/'}>
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route path={'/maps/:mapId/view'}>
          <Editor isEditor={false} />
        </Route>
        <Route path={'/maps/:mapId'}>
          <Editor isEditor={true} />
        </Route>
        <Redirect to={'/'} />
      </Switch>
    </HashRouter>
  );
};

export default App;
