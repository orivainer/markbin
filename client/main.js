import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import App from './components/app';
import binsMain from './components/bins/binsMain';
import BinsList from './components/bins/binsList';
import { Bins } from '../imports/collections/bins';





const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BinsList} />
      <Route path="bins/:binId" component={binsMain}></Route>
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("appContainer"));
})