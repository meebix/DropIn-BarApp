/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var currentUserId = require('../auth/auth.controller').currentUserId;
var four0four = require('../../utils/404')();

var userQuery = new Parse.Query(Parse.User);
var newUser = new Parse.User();

// Export
module.exports = {
  allUsers: allUsers,
  createUser: createUser,
  updateUser: updateUser,
  showUser: showUser,
  editUser: editUser,
  deleteUser: deleteUser
};

// Route Logic
function allUsers(req, res) {

}

function createUser(req, res) {
  var userObj = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  newUser.save(userObj).then(function() {
    res.status(200).end();
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function updateUser(req, res) {

}

function showUser(req, res) {

}

function editUser(req, res) {

}

function deleteUser(req, res) {

}
