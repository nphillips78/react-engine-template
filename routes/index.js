'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();

/**
 * GET index page.
 */
router.get('/', function(req, res, next) {
    res.render(req.path, { title: 'Express + React-Engine' });
});

/**
 * GET all routes and send them to `react-router`.
 */
router.get('*', function(req, res, next) {
    res.render(req.path, { title: req.path });
});

/**
 * Export router.
 */
module.exports = router;
