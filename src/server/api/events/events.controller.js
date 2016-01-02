/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var crypto = require('crypto');
var _ = require('underscore');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var Events = Parse.Object.extend('Events');
var Role = Parse.Object.extend('Role');
var LoyaltyLevels = Parse.Object.extend('Loyalty_Levels');
var UsersEvents = Parse.Object.extend('Users_Events');
var EventStats = Parse.Object.extend('Stats_Events');
var roleQuery = new Parse.Query(Role);
var loyaltyQuery = new Parse.Query(LoyaltyLevels);
var usersQuery = new Parse.Query(Parse.User);

// Export
module.exports = {
  allEvents: allEvents,
  createEvent: createEvent,
  updateEvent: updateEvent,
  showEvent: showEvent,
  deleteEvent: deleteEvent
};

// Route Logic
function allEvents(req, res) {
  var eventsQuery = new Parse.Query(Events);
  var dateLimitation;

  if (req.query.limitByDate === 'true') {
    dateLimitation = new Date();
  } else {
    // Set date in past so all events pull from DB
    dateLimitation = new Date('01', '01', '1970');
  }

  eventsQuery.equalTo('barId', currentUserBarObj());
  eventsQuery.notEqualTo('markedForDeletion', true);
  eventsQuery.greaterThan('eventEnd', dateLimitation);
  eventsQuery.include('loyaltyLevelId');
  eventsQuery.find().then(function(events) {
    res.status(200).json({data: events});
  }, function(error) {
    res.status(400).end();
  });
}

function createEvent(req, res) {
  var newEvent = new Events();
  var loyaltyLevelId = req.body.loyaltyLevelId;

  // Query to Parse
  loyaltyQuery.equalTo('objectId', loyaltyLevelId);
  loyaltyQuery.first().then(function(loyaltyLevelObj) {
    var eventObj = {
      name: req.body.name,
      description: req.body.description,
      photo: prepareImageForParse(req.body.photo),
      eventStart: transformDateForParse(req.body.eventStart),
      eventEnd: transformDateForParse(req.body.eventEnd),
      loyaltyLevelId: loyaltyLevelObj,
      barId: currentUserBarObj(),
      markedForDeletion: false
    };

    // Save the event
    return newEvent.save(eventObj).then(function(savedEventObj) {
      return savedEventObj;
    }, function(error) {
      // Error saving: New Event Object
      console.log(error);
      res.status(400).end();
    })
    .then(function(savedEventObj) {
      // Get the role object for 'User'
      roleQuery.equalTo('objectId', 'ArWsSwq2Ky'); // TODO: Unhardcode this piece, 'User' role id
      return roleQuery.first().then(function(roleObj) {
        return roleObj;
      }, function(error) {
        // Error retrieving: Role Object
        console.log(error);
        res.status(400).end();
      })
      .then(function(roleObj) {
        // Find all users who have a role of 'User' and for each user
        // save a new UsersEvents to the join table
        usersQuery.equalTo('roleId', roleObj);

        // If statement checks to see if the loyalty level is 'All'
        // TODO: Fixed hardcoded value
        if (loyaltyLevelObj.id !== 'cpMUn6twQc') {
          sendToSpecified(savedEventObj, loyaltyLevelObj, req, res);
        } else {
          sendToAll(savedEventObj, req, res);
        }
      });
    });
  }, function(error) {
    // Error retrieving: Loyalty Object
    console.log(error);
    res.status(400).end();
  });
}

function updateEvent(req, res) {
  var eventsQuery = new Parse.Query(Events);

  // Query to Parse
  eventsQuery.equalTo('objectId', req.params.id);
  eventsQuery.first().then(function(result) {
    var eventObj = {
      name: req.body.name,
      description: req.body.description,
      eventStart: transformDateForParse(req.body.eventStart),
      eventEnd: transformDateForParse(req.body.eventEnd),
    };

    return result.save(eventObj).then(function() {
      res.status(200).json({data: result});
    }, function(error) {
      console.log(error);
      res.status(400).end();
    })
    .then(function() {
      var eventsQuery = new Parse.Query(Events);
      var usersEventsQuery = new Parse.Query(UsersEvents);

      eventsQuery.equalTo('objectId', req.params.id);
      eventsQuery.first().then(function(eventObj) {
        return eventObj;
      })
      .then(function(eventObj) {
        usersEventsQuery.equalTo('eventId', eventObj);
        usersEventsQuery.find().then(function(results) {
          _.each(results, function(obj) {
            obj.set('eventStart', transformDateForParse(req.body.eventStart));
            obj.set('eventEnd', transformDateForParse(req.body.eventEnd));
            obj.save();
          });

          res.status(200).end();
        });
      });
    });
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function showEvent(req, res) {
  var eventsQuery = new Parse.Query(Events);

  eventsQuery.equalTo('objectId', req.params.id);
  eventsQuery.include('loyaltyLevelId');
  eventsQuery.first().then(function(result) {
    res.status(200).json({data: result});
  }, function(error) {
    console.log(error);
    res.status(400).end();
  });
}

function deleteEvent(req, res) {
  var eventsQuery = new Parse.Query(Events);

  eventsQuery.equalTo('objectId', req.params.id);
  eventsQuery.first().then(function(eventObj) {
    eventObj.set('markedForDeletion', true);
    eventObj.save();

    res.status(200).json({data: eventObj});
    return eventObj;
  }, function(error) {
    console.log(error);
    res.status(400).end();
  })
  .then(function(eventObj) {
    var usersEventsQuery = new Parse.Query(UsersEvents);

    usersEventsQuery.equalTo('eventId', eventObj);
    usersEventsQuery.find().then(function(results) {
      _.each(results, function(obj) {
        obj.set('markedForDeletion', true);
        obj.save();
      });
    }, function(error) {
      // Error retrieving: UsersEvents Object
      console.log(error);
      res.status(400).end();
    });
  });
}

// Utility Functions
// =====================

// Send event to ALL users
function sendToAll(savedEventObj, req, res) {
  return usersQuery.find().then(function(results) {
    console.log('*** USERS COUNT ***', results.length);

    _.each(results, function(userObj) {
      console.log('--- INSIDE EACH ---', userObj.id);

      var newUsersEvents = new UsersEvents();

      var usersEventsObj = {
        eventId: savedEventObj,
        userId: userObj,
        barId: currentUserBarObj(),
        eventStart: transformDateForParse(req.body.eventStart),
        eventEnd: transformDateForParse(req.body.eventEnd),
        userHasViewed: false,
        markedForDeletion: false
      };

      return newUsersEvents.save(usersEventsObj).then(function(savedObj) {
        console.log('--- SAVED ---', savedObj.id);

        res.status(200).end();
      }, function(error) {
        // Error saving: New UsersEvent Object
        console.log(error);
        res.status(400).end();
      });
    });
  }, function(error) {
    // Error retrieving: Users
    console.log(error);
    res.status(400).end();
  });
}

// Send event to SPECIFIED users
function sendToSpecified(savedEventObj, loyaltyLevelObj, req, res) {
  usersQuery.equalTo('loyaltyLevelId', loyaltyLevelObj);
  return usersQuery.find().then(function(results) {
    console.log('*** USERS COUNT ***', results.length);

    _.each(results, function(userObj) {
      console.log('--- INSIDE EACH ---', userObj.id);

      var newUsersEvents = new UsersEvents();

      var usersEventsObj = {
        eventId: savedEventObj,
        userId: userObj,
        barId: currentUserBarObj(),
        eventStart: transformDateForParse(req.body.eventStart),
        eventEnd: transformDateForParse(req.body.eventEnd),
        userHasViewed: false,
        markedForDeletion: false
      };

      return newUsersEvents.save(usersEventsObj).then(function(savedObj) {
        console.log('--- SAVED ---', savedObj.id);

        res.status(200).end();
      }, function(error) {
        // Error saving: New UsersEvent Object
        console.log(error);
        res.status(400).end();
      });
    });
  }, function(error) {
    // Error retrieving: Users
    console.log(error);
    res.status(400).end();
  });
}

// Utility to transform date for Parse
// This just creates a date object for Parse to read
// Parse seems to be converting date to UTC before storing it automatically
function transformDateForParse(date) {
  var newDate = new Date(date);

  return newDate;
}

// Write image to disk
function prepareImageForParse(image) {
  var base64Image = image.replace(/^data:image\/png;base64,/, '');
  var checkSum = crypto.randomBytes(15).toString('hex');

  var photoFile = new Parse.File(checkSum + '.png', {base64: base64Image});

  return photoFile;
}
