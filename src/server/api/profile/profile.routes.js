/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('../auth/auth.controller');
var profileController = require('./profile.controller');

// Routes
router.post('/:id', profileController.updateProfileData);
router.get('/:id', profileController.getProfileData);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
