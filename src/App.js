import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Editor from './Editor';
import Home from './Home';

console.log('got app');

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/maps/:mapId">
        <Editor />
      </Route>
    </Router>
  );
};

export default App;
