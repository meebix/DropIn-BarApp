/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var moment = require('moment');
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
  var oneWeekAgoDate = new Date(moment(new Date()).subtract(8, 'days')._d);

  trafficStats.equalTo('barId', currentUserBarObj());
  trafficStats.include('barId');
  trafficStats.descending('calcDate');
  trafficStats.greaterThanOrEqualTo('calcDate', oneWeekAgoDate);
  trafficStats.find().then(function(results) {
    var values = [];
    var calcDates = [];
    var barName = [results[0].attributes.barId.attributes.name];

    _.each(results, function(result) {
      values.unshift(result.attributes.visitsByCredit);
      calcDates.unshift(moment.utc(result.attributes.calcDate).format('MMM-DD'));
    });

    var stats = [values, calcDates, barName];

    res.status(200).json({data: stats});
  }, function(error) {
    res.status(400).end();
  });
}
