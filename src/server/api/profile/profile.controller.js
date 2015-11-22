/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var four0four = require('../../utils/404')();

// Parse objects
var Bar = Parse.Object.extend('Bars');
var barsQuery = new Parse.Query(Bar);

// Export
module.exports = {
  getProfileData: getProfileData,
  updateProfileData: updateProfileData
};

// Route Logic
function getProfileData(req, res) {
  barsQuery.get(req.params.id).then(function(bar) {
    res.status(200).json(bar);
  },
  function(bar, error) {
    res.status(400).json({message: 'Cannot find bar'});
  });
}

function updateProfileData(req, res) {
  barsQuery.get(req.params.id).then(function(bar) {
    bar.set('barEmailAddress', req.body.barEmailAddress);
    bar.set('phoneNumber', req.body.phoneNumber);
    bar.set('missionStatement', req.body.missionStatement);
    bar.save();

    res.status(200).end();
  },
  function(bar, error) {
    res.status(400).json({message: 'Cannot update bar'});
  });
}
