/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var moment = require('moment');
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var RewardStats = Parse.Object.extend('Stats_Rewards');

// Export
module.exports = {
  statsData: statsData
};

// Route Logic
function statsData(req, res) {
  var rewardStats = new Parse.Query(RewardStats);
  var oneWeekAgoDate = new Date(moment(new Date()).subtract(8, 'days')._d);

  rewardStats.equalTo('barId', currentUserBarObj());
  rewardStats.include('barId');
  rewardStats.descending('calcDate');
  rewardStats.greaterThanOrEqualTo('calcDate', oneWeekAgoDate);
  rewardStats.find().then(function(results) {
    var values = [];
    var calcDates = [];
    var barName = [results[0].attributes.barId.attributes.name];
    var barId = [results[0].attributes.barId.attributes.name];

    _.each(results, function(result) {
      values.unshift(result.attributes.rewardsRedeemed);
      calcDates.unshift(moment.utc(result.attributes.calcDate).format('MMM-DD'));
    });

    var stats = [values, calcDates, barName, barId];

    res.status(200).json({data: stats});
  }, function(error) {
    res.status(400).end();
  });
}
