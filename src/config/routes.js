import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Main from '../components/Main';
import RecipeBox from '../containers/RecipeBox';

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
         <IndexRoute component={RecipeBox}/>
    </Route>
  </Router>
);

module.exports = routes;
