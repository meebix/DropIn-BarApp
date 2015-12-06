/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var Bar = Parse.Object.extend('Bar');

// Export
module.exports = {
  allRewards: allRewards,
  showReward: showReward,
  updateReward: updateReward
};

// Route Logic
function allRewards(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.notEqualTo('isActive', false);
  barQuery.find().then(function(bars) {
    res.status(200).json({data: bars});
  }, function(error) {
    res.status(400).end();
  });
}

function showReward(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(barObj) {
    res.status(200).json({data: barObj});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function updateReward(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(foundBar) {
    var barObj = {
      reward: req.body.reward
    };

    return foundBar.save(barObj).then(function(savedBarObj) {
      res.status(200).json({data: savedBarObj});
    }, function(error) {
      console.log(error);
      res.status(400).end();
    });
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}
