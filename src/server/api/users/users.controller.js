/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var User = Parse.Object.extend('User');
var Bar = Parse.Object.extend('Bar');
var Role = Parse.Object.extend('Role');
var LoyaltyLevels = Parse.Object.extend('Loyalty_Levels');

// Export
module.exports = {
  allUsers: allUsers,
  createUser: createUser,
  deleteUser: deleteUser
};

// Route Logic
function allUsers(req, res) {
  var usersQuery = new Parse.Query(Parse.User);
  var roleQuery = new Parse.Query(Role);

  roleQuery.equalTo('objectId', 'qwekFNkzFc');
  roleQuery.first().then(function(roleObj) {
    usersQuery.equalTo('roleId', roleObj);
    usersQuery.include('barId');
    return usersQuery.find().then(function(results) {
      res.status(200).json({data: results});
    }, function(error) {
    res.status(400).end();
    });
  }, function(error) {
    res.status(400).end();
  });
}

function createUser(req, res) {
  var newUser = new User();
  var barId = req.body.barId;
  var roleQuery = new Parse.Query(Role);
  var barQuery = new Parse.Query(Bar);

  roleQuery.equalTo('objectId', 'qwekFNkzFc');
  roleQuery.first().then(function(roleObj) {
    var userObj = {
      username: req.body.username,
      password: 'RANDOM', // generate random password, have them reset it
      email: req.body.email,
      roleId: roleObj
    };

    return userObj;
  })
  .then(function(userObj) {
    barQuery.equalTo('objectId', barId);
    return barQuery.first().then(function(barObj) {
      userObj.barId = barObj;

      // Save the user
      return newUser.save(userObj).then(function(savedUserObj) {
        // success
        res.status(200).json({data: savedUserObj});
      }, function(error) {
        // Error saving: New User Object
        console.log(error);
        res.status(400).end();
      });
    });
  });
}

function deleteUser(req, res) {
  var usersQuery = new Parse.Query(Parse.User);

  Parse.Cloud.useMasterKey();
  usersQuery.equalTo('objectId', req.params.id);
  usersQuery.first().then(function(userObj) {
    // Delete the user
    return userObj.destroy().then(function() {
      // success
      res.status(200).end();
    }, function(error) {
      // Error saving: Deleting User
      console.log(error);
      res.status(400).end();
    });
  });
}
