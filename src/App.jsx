import './App.css';
import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import MapViewer from './MapViewer';
import MapList from './MapList';

/** Routing for the app. */
const App = () => {
  return (
    <HashRouter basename={'/'}>
      <Switch>
        <Route exact path={'/'}>
          <MapList />
        </Route>
        <Route path={'/maps/:mapId/view'}>
          <MapViewer isEditor={false} />
        </Route>
        <Route path={'/maps/:mapId'}>
          <MapViewer isEditor={true} />
        </Route>
        <Redirect to={'/'} />
      </Switch>
    </HashRouter>
  );
};

export default App;
