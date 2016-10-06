'use strict';

/**
 * Module dependencies.
 */
var React = require('react'); // `react-router` depends on `react`
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

/**
 * Routes.
 */
module.exports = (
    <Router history={ReactRouter.browserHistory}>
        <Route path='/' component={require('../views/layout/Layout')}>

            {/* homepage */}
            <IndexRoute component={require('../views/Index')} />

        </Route>
    </Router>
);
