/*jshint node:true*/
'use strict';

// Requires
var express = require('express');
var app = express();
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV;

// Inject middleware
require('./config/middleware.js')(app, express);

// Boot server
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname  +
    '\nprocess.cwd = ' + process.cwd());
});

// Export object
module.exports = app;
