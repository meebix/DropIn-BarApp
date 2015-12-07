/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var four0four = require('../../utils/404')();

var DropInStats = Parse.Object.extend('Stats_DropIn');

// Export
module.exports = {
  statsData: statsData
};

// Route Logic
function statsData(req, res) {
  var dropinStats = new Parse.Query(DropInStats);

  dropinStats.descending('calcDate');
  dropinStats.first().then(function(results) {
    res.status(200).json({data: results});
  }, function(error) {
    res.status(400).end();
  });
}
