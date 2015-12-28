/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var Events = Parse.Object.extend('Events');
var EventStats = Parse.Object.extend('Stats_Events');

// req.params.id

// Export
module.exports = {
  statsData: statsData
};

// Route Logic
function statsData(req, res) {
  var eventQuery = new Parse.Query(Events);
  var eventStats = new Parse.Query(EventStats);

  eventQuery.equalTo('objectId', req.params.id);
  eventQuery.first().then(function(eventObj) {
    eventStats.equalTo('eventId', eventObj);
    eventStats.equalTo('barId', currentUserBarObj());
    eventStats.include('eventId');
    eventStats.descending('calcDate');
    return eventStats.first().then(function(results) {
      res.status(200).json({data: results});
    }, function(error) {
      res.status(400).end();
    });
  });
}
