/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var EventStats = Parse.Object.extend('Stats_Events');

// Export
module.exports = {
  statsData: statsData
};

// Route Logic
function statsData(req, res) {
  var eventStats = new Parse.Query(EventStats);

  eventStats.equalTo('barId', currentUserBarObj());
  eventStats.include('barId.eventId');
  eventStats.find().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    res.status(400).end();
  });
}
