'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var ReactEngine = require('react-engine');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
// `process.env.NODE_ENV`, default is "development"
var isProduction = app.get('env') === 'production';

// make `.jsx` file requireable by node
require('node-jsx').install({ extension: '.jsx' });

/**
 * View engine setup.
 */
var routesFilePath = path.join(__dirname, 'routes/Routes');
var engine = ReactEngine.server.create({
    routes: require(routesFilePath),
    routesFilePath: routesFilePath
});
app.engine('.jsx', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.set('view', ReactEngine.expressView);

/**
 * Middleware.
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// properties that are local variables within the application
// http://expressjs.com/en/api.html#app.locals
app.locals.isProduction = isProduction;

/**
 * Routes.
 */
app.use('/', require('./routes/index'));

/**
 * Error.
 */
app.use(function(err, req, res, next) {
    // http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) return next(err);

    // production error handler will not leak stacktrace
    var error = {};

    // `react-router` error types
    if (err._type) {
        // redirect
        if (err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
            return res.redirect(302, err.redirectLocation);

        // match not found
        } else if (err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
            error.message = 'Not Found';
            err.status = 404;
            res.status(404);

        // internal server error
        } else {
            error.message = 'Internal Server Error';
            err.status = 500;
            res.status(500);
        }

        // development error handler will print stacktrace
        if (!isProduction) {
            error = {
                message: err.message,
                status: err.status,
                stack: err.stack
            };
        }

        res.render('Error', {
            title: err.title || 'Error',
            message: error.message,
            error: error
        });
    }
});

/**
 * Export app.
 */
module.exports = app;
