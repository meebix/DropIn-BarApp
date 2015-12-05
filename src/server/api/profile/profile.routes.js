/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('../auth/auth.controller');
var profileController = require('./profile.controller');

// Routes
router.get('/', profileController.allProfiles);
router.post('/', profileController.createProfile);
router.get('/:id', profileController.showProfile);
router.post('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
