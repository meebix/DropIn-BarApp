/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('./helpers.controller');

// Routes
router.get('/bars', authController.getBars);
router.get('/loyalty-levels', authController.getLoyaltyLevels);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
