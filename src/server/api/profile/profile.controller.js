/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var Bar = Parse.Object.extend('Bar');
var Role = Parse.Object.extend('Role');
var roleQuery = new Parse.Query(Role);

// Export
module.exports = {
  allProfiles: allProfiles,
  createProfile: createProfile,
  updateProfile: updateProfile,
  showProfile: showProfile,
  deleteProfile: deleteProfile
};

// Route Logic
function allProfiles(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.notEqualTo('isActive', false);
  barQuery.find().then(function(bars) {
    res.status(200).json({data: bars});
  }, function(error) {
    res.status(400).end();
  });
}

function createProfile(req, res) {
  var newBar = new Bar();

  var barObj = {
    // TODO: Add photo upload
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description,
    zip: req.body.zip,
    mondayPromotion: req.body.mondayPromotion,
    tuesdayPromotion: req.body.tuesdayPromotion,
    wednesdayPromotion: req.body.wednesdayPromotion,
    thursdayPromotion: req.body.thursdayPromotion,
    fridayPromotion: req.body.fridayPromotion,
    saturdayPromotion: req.body.saturdayPromotion,
    sundayPromotion: req.body.sundayPromotion,
    isActive: true
  };

  // Save the bar
  newBar.save(barObj).then(function(savedBarObj) {
    // success
    res.status(200).json({data: savedBarObj});
  }, function(error) {
    // Error saving: New Bar Object
    console.log(error);
    res.status(400).end();
  });
}

function updateProfile(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(foundBar) {
    var barObj = {
      // TODO: Add photo upload
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      email: req.body.email,
      description: req.body.description,
      zip: req.body.zip,
      mondayPromotion: req.body.mondayPromotion,
      tuesdayPromotion: req.body.tuesdayPromotion,
      wednesdayPromotion: req.body.wednesdayPromotion,
      thursdayPromotion: req.body.thursdayPromotion,
      fridayPromotion: req.body.fridayPromotion,
      saturdayPromotion: req.body.saturdayPromotion,
      sundayPromotion: req.body.sundayPromotion,
      isActive: true
    };

    return foundBar.save(barObj).then(function(savedBarObj) {
      res.status(200).json({data: savedBarObj});
    }, function(error) {
      console.log(error);
      res.status(400).end();
    });
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function showProfile(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(barObj) {
    res.status(200).json({data: barObj});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function deleteProfile(req, res) {
  var barQuery = new Parse.Query(Bar);

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(barObj) {
    barObj.set('isActive', false);
    barObj.save();

    res.status(200).json({data: barObj});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}
