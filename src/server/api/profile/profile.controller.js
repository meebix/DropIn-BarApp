/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var crypto = require('crypto');
var _ = require('underscore');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();
var validator = require('../../validations/validator');
var models = require('../../validations/models');

var Bar = Parse.Object.extend('Bar');
var Role = Parse.Object.extend('Role');
var AppParams = Parse.Object.extend('App_Params');
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

  barQuery.find().then(function(bars) {
    res.status(200).json({data: bars});
  }, function(error) {
    res.status(400).end();
  });
}

function createProfile(req, res) {
  var newBar = new Bar();

  var barObj = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description,
    thumbnail: prepareImageForParse(req.body.thumbnail),
    photo: prepareImageForParse(req.body.photo),
    beaconMajor: Number(req.body.beaconMajor),
    beaconMinor: Number(req.body.beaconMinor),
    latitude: Number(req.body.latitude),
    longitude: Number(req.body.longitude),
    mondayPromotion: req.body.mondayPromotion,
    tuesdayPromotion: req.body.tuesdayPromotion,
    wednesdayPromotion: req.body.wednesdayPromotion,
    thursdayPromotion: req.body.thursdayPromotion,
    fridayPromotion: req.body.fridayPromotion,
    saturdayPromotion: req.body.saturdayPromotion,
    sundayPromotion: req.body.sundayPromotion,
    reward: req.body.reward,
    isActive: req.body.isActive
  };

  // Validations
  validator.validate(barObj, models.profileModel, function(errorMessage) {
    if (errorMessage) {
      res.status(400).json({validationError: errorMessage});
    } else {
      // Save the bar
      newBar.save(barObj).then(function(savedBarObj) {
        return savedBarObj;
      }, function(error) {
        // Error saving: New Bar Object
        console.log(error);
        res.status(400).end();
      })
      .then(function(savedBarObj) {
        var paramsQuery = new Parse.Query(AppParams);

        if (req.body.isActive === true) {
          paramsQuery.equalTo('paramName', 'totalBarsOnboarded');
          paramsQuery.first().then(function(obj) {
            var currentCount = obj.get('number1');
            var addOne = currentCount + 1;

            obj.set('number1', addOne);
            obj.save();

            res.status(200).json({data: savedBarObj});
          }, function(error) {
            console.log(error);
          });
        } else {
          res.status(200).json({data: savedBarObj});
        }
      });
    }
  });
}

function updateProfile(req, res) {
  var barQuery = new Parse.Query(Bar);
  var currentIsActiveValue;

  barQuery.equalTo('objectId', req.params.id);
  barQuery.first().then(function(foundBar) {
    currentIsActiveValue = foundBar.attributes.isActive;

    var barObj = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      description: req.body.description,
      beaconMajor: Number(req.body.beaconMajor),
      beaconMinor: Number(req.body.beaconMinor),
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      mondayPromotion: req.body.mondayPromotion,
      tuesdayPromotion: req.body.tuesdayPromotion,
      wednesdayPromotion: req.body.wednesdayPromotion,
      thursdayPromotion: req.body.thursdayPromotion,
      fridayPromotion: req.body.fridayPromotion,
      saturdayPromotion: req.body.saturdayPromotion,
      sundayPromotion: req.body.sundayPromotion,
      isActive: req.body.isActive
    };

    // Images (Optional)
    if (req.body.thumbnail !== null) {
      barObj.thumbnail = prepareImageForParse(req.body.thumbnail);
    }

    if (req.body.photo !== null) {
      barObj.photo = prepareImageForParse(req.body.photo);
    }

    // Validations
    validator.validate(barObj, models.profileModel, function(errorMessage) {
      if (errorMessage) {
        res.status(400).json({validationError: errorMessage});
      } else {
        return foundBar.save(barObj).then(function(savedBarObj) {
          return savedBarObj;
        }, function(error) {
          console.log(error);
          res.status(400).end();
        })
        .then(function(savedBarObj) {
          var paramsQuery = new Parse.Query(AppParams);

          paramsQuery.equalTo('paramName', 'totalBarsOnboarded');
          paramsQuery.first().then(function(obj) {
            var currentCount = obj.get('number1');
            var addOne = currentCount + 1;
            var subtractOne = currentCount - 1;

            if (currentIsActiveValue !== true && req.body.isActive === true) {
              obj.set('number1', addOne);
            } else if (req.body.isActive === false) {
              obj.set('number1', subtractOne);
            }

            obj.save();
            res.status(200).json({data: savedBarObj});
          }, function(error) {
            console.log(error);
          });
        });
      }
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
    var paramsQuery = new Parse.Query(AppParams);

    paramsQuery.equalTo('paramName', 'totalBarsOnboarded');
    paramsQuery.first().then(function(obj) {
      var currentCount = obj.get('number1');
      var subtractOne = currentCount - 1;

      obj.set('number1', subtractOne);
      obj.save();
    })
    .then(function() {
      barObj.set('isActive', false);
      barObj.save();

      res.status(200).json({data: barObj});
    });
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

// Utilities
// ======

// Prepare image for Parse
function prepareImageForParse(image) {
  if (image === null) {
    return null;
  }

  var base64Image = image.replace(/^data:image\/png;base64,/, '');
  var checkSum = crypto.randomBytes(15).toString('hex');

  var photoFile = new Parse.File(checkSum + '.png', {base64: base64Image});

  return photoFile;
}
