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

// make `.jsx` file requireable by node
require('node-jsx').install({ extension: '.jsx' });

// view engine setup
var engine = ReactEngine.server.create();
app.engine('.jsx', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.set('view', ReactEngine.expressView);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes.
 */
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    next(err);
});

/**
 * Error.
 */
// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('Error', {
            title: err.title || 'Error',
            message: err.message,
            error: err
        });
    });
}

// production error handler will not leak stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('Error', {
        title: err.title || 'Error',
        message: err.message,
        error: {}
    });
});

/**
 * Export app.
 */
module.exports = app;
