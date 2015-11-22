/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var rewardsController = require('./rewards.controller');

// Routes
router.get('/', rewardsController.allUsers);
router.post('/', rewardsController.createUser);
router.get('/:id', rewardsController.showUser);
router.post('/:id', rewardsController.updateUser);
router.delete('/:id', rewardsController.deleteUser);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
