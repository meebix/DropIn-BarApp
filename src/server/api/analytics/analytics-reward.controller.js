/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
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

  rewardStats.equalTo('barId', currentUserBarObj());
  rewardStats.include('barId');
  rewardStats.descending('calcDate');
  rewardStats.first().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    res.status(400).end();
  });
}
