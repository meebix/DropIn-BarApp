/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var analyticsUserController = require('./analytics-user.controller');
var analyticsTrafficController = require('./analytics-traffic.controller');
var analyticsRewardController = require('./analytics-reward.controller');
var analyticsEventController = require('./analytics-event.controller');

// Routes
router.get('/analytics-user', analyticsUserController.getUserAnalytics);
router.get('/analytics-traffic', analyticsTrafficController.getTrafficAnalytics);
router.get('/analytics-reward', analyticsRewardController.getRewardAnalytics);
router.get('/analytics-event', analyticsEventController.getEventAnalytics);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
