/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var analyticsDropInController = require('./analytics-dropin.controller');
var analyticsEventsController = require('./analytics-event.controller');
var analyticsRewardsController = require('./analytics-reward.controller');
var analyticsTrafficController = require('./analytics-traffic.controller');
var analyticsUserController = require('./analytics-user.controller');

// Routes
router.get('/single-dropin', analyticsDropInController.singleStatsData);
router.get('/multiple-dropin', analyticsDropInController.multipleStatsData);
router.get('/events/:id', analyticsEventsController.statsData);
router.get('/rewards', analyticsRewardsController.statsData);
router.get('/traffic', analyticsTrafficController.statsData);
router.get('/users', analyticsUserController.statsData);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
