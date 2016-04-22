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
    res.render('Index.jsx', { title: 'Express + React-Engine' });
});

/**
 * Export router.
 */
module.exports = router;
