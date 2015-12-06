/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var authController = require('../auth/auth.controller');
var usersController = require('./users.controller');

// Routes
router.get('/', usersController.allUsers);
router.post('/', usersController.createUser);
router.delete('/:id', usersController.deleteUser);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
