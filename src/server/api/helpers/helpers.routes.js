/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var helpersController = require('./helpers.controller');

// Routes
router.get('/bars', helpersController.getBars);
router.get('/users-bar', helpersController.getCurrentUsersBar);
router.get('/loyalty-levels', helpersController.getLoyaltyLevels);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
