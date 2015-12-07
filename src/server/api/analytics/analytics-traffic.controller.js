/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var TrafficStats = Parse.Object.extend('Stats_Traffic');

// Export
module.exports = {
  statsData: statsData
};

// Route Logic
function statsData(req, res) {
  var trafficStats = new Parse.Query(TrafficStats);

  trafficStats.equalTo('barId', currentUserBarObj());
  trafficStats.include('barId');
  trafficStats.descending('calcDate');
  trafficStats.first().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    res.status(400).end();
  });
}
