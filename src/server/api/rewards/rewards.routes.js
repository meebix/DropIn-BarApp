/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('../auth/auth.controller');
var rewardsController = require('./rewards.controller');

// Routes
router.get('/', rewardsController.allRewards);
router.get('/:id', rewardsController.showReward);
router.post('/:id', rewardsController.updateReward);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
