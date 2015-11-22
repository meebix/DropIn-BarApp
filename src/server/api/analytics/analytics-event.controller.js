/*jshint node:true*/
'use strict';

// Requires
var four0four = require('../../utils/404')();

// Export
module.exports = {
  getEventAnalytics: getEventAnalytics
};

// Route Logic
function getEventAnalytics(req, res, next) {
  res.status(200);
}
