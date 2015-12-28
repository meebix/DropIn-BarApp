/*jshint node:true*/
'use strict';

// Requires
var router = require('express').Router();
var multer  = require('multer');
var four0four = require('../../utils/404')();
var eventsController = require('./events.controller');

// File options via Multer
var upload = multer({
  dest: 'images/',
  limits: {
    fileSize: 1000000
  }
});

// Routes
router.get('/', eventsController.allEvents);
router.post('/', upload.single('photo'), eventsController.createEvent);
router.get('/:id', eventsController.showEvent);
router.post('/:id', upload.single('photo'), eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
