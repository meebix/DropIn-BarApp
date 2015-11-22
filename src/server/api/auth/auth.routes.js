/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('./auth.controller');

// Routes
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset-password', authController.resetPassword);
router.get('/is-authenticated', authController.isAuthenticated);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
