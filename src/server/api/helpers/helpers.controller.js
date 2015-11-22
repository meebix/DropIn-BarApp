/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var four0four = require('../../utils/404')();

var LoyaltyLevels = Parse.Object.extend('Loyalty_Levels');
var loyaltyLevelsQuery = new Parse.Query(LoyaltyLevels);

// Export
module.exports = {
  getLoyaltyLevels: getLoyaltyLevels,
};

// Route Logic
function getLoyaltyLevels(req, res) {
  loyaltyLevelsQuery.find().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}
