/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var four0four = require('../../utils/404')();

var LoyaltyLevels = Parse.Object.extend('Loyalty_Levels');
var Bar = Parse.Object.extend('Bar');

// Export
module.exports = {
  getBars: getBars,
  getLoyaltyLevels: getLoyaltyLevels,
};

// Route Logic
function getBars(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.find().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function getLoyaltyLevels(req, res) {
  var loyaltyLevelsQuery = new Parse.Query(LoyaltyLevels);

  loyaltyLevelsQuery.find().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}
