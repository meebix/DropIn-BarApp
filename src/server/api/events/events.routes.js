/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var four0four = require('../../utils/404')();
var eventsController = require('./events.controller');

// Routes
router.get('/', eventsController.allEvents);
router.post('/', eventsController.createEvent);
router.get('/:id', eventsController.showEvent);
router.post('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
