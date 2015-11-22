/*jshint node:true*/
'use strict';

// Requires
var four0four = require('../../utils/404')();

// Export
module.exports = {
  getTrafficAnalytics: getTrafficAnalytics
};

// Route Logic
function getTrafficAnalytics(req, res, next) {
  res.status(200);
}
