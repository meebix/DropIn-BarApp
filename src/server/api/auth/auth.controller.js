/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var four0four = require('../../utils/404')();

// Export
module.exports = {
  login: login,
  logout: logout,
  resetPassword: resetPassword,
  isAuthenticated: isAuthenticated,
  hasAccess: hasAccess,
  currentUserObj: currentUserObj,
  currentUserRoleObj: currentUserRoleObj,
  currentUserBarObj: currentUserBarObj
};

// Route Logic
function login(req, res, next) {
  // Method enabling current user via Parse in Node (TODO: Change, not safe)
  Parse.User.enableUnsafeCurrentUser();

  Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
    // Set session token
    req.session.token = user.getSessionToken();

    // Set cookie
    res.cookie('user', JSON.stringify(user));

    res.status(200).json({user: user});
  },
  function(user, error) {
    res.status(401).end();
  });
}

function logout(req, res, next) {
  req.session = null;
  res.clearCookie('user');
  res.status(200).end();
}

function resetPassword(req, res, next) {
  Parse.User.requestPasswordReset(req.body.username).then(function() {
    res.status(200).send({message: 'Password reset'});
  },
  function(error) {
    res.status(400).send({message: 'Password not reset'});
  });
}

function isAuthenticated(req, res, next) {
  if (req.session.token) {
    res.status(200).end();
  } else {
    // TODO: Made an actual 401 status and on Angular app create an interceptor
    res.status(200).json({authorized: false});
  }
}

function hasAccess(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    // TODO: Made an actual 401 status and on Angular app create an interceptor
    res.status(200).json({authorized: false});
  }
}

function currentUserObj() {
  var user = Parse.User.current();
  return user;
}

function currentUserRoleObj() {
  var user = Parse.User.current();
  return user.attributes.roleId;
}

function currentUserBarObj() {
  var user = Parse.User.current();
  return user.attributes.barId;
}
