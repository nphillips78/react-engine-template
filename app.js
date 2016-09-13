'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var ReactEngine = require('react-engine');
var path = require('path');
var bodyParser = require('body-parser');
var dependencies = require('./package').dependencies;

var app = express();
// `process.env.NODE_ENV`, default is "development"
var isProduction = process.env.NODE_ENV === 'production';

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
// uncomment after placing your favicon
//app.use(require('serve-favicon)(path.join(__dirname, 'build/favicon.ico')));
app.use(require('morgan')('dev')); // logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'build')));

// properties that are local variables within the application
// http://expressjs.com/en/api.html#app.locals
app.locals.isProduction = isProduction;
function cleanVersion(v) { return v.replace(/^\D/, ''); }
app.locals.versions = {
    'react': cleanVersion(dependencies['react']),
    'react-dom': cleanVersion(dependencies['react-dom']),
    'react-router': cleanVersion(dependencies['react-router'])
};

if (!isProduction) {
    app.locals.publicPath = require('./webpack/development.config').output.publicPath;
}

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
    }

    res.render('Error', {
        title: err.title || 'Error',
        message: error.message,
        error: error
    });
});

/**
 * Export app.
 */
module.exports = app;
