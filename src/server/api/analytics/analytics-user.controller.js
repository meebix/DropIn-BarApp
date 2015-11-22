/*jshint node:true*/
'use strict';

// Requires
var four0four = require('../../utils/404')();

// Export
module.exports = {
  getUserAnalytics: getUserAnalytics
};

// Route Logic
function getUserAnalytics(req, res, next) {
  res.status(200);
}
