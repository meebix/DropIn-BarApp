/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var fs = require('fs');
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

  eventsQuery.equalTo('barId', currentUserBarObj());
  eventsQuery.notEqualTo('markedForDeletion', true);
  eventsQuery.greaterThan('eventStart', new Date());
  eventsQuery.include('loyaltyLevelId');
  eventsQuery.find().then(function(events) {
    res.status(200).json({data: events});
  }, function(error) {
    res.status(400).end();
  });
}

function createEvent(req, res) {
  // eventData being appended in stringified format from Angular
  // TODO: Do I really need a try catch here?
  req.body = JSON.parse(req.body.eventData);

  var newEvent = new Events();
  var loyaltyLevelId = req.body.loyaltyLevelId;

  // Query to Parse
  loyaltyQuery.equalTo('objectId', loyaltyLevelId);
  loyaltyQuery.first().then(function(loyaltyLevelObj) {
    var eventObj = {
      name: req.body.name,
      description: req.body.description,
      eventStart: transformDateForParse(req.body.eventStart),
      eventEnd: transformDateForParse(req.body.eventEnd),
      loyaltyLevelId: loyaltyLevelObj,
      barId: currentUserBarObj(),
      markedForDeletion: false
    };

    // If a photo is present, add it to the JSON object
    if (req.file) {
      eventObj.photo = prepareImage(req.file);
    }

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
  // eventData being appended in stringified format from Angular
  req.body = JSON.parse(req.body.eventData);

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

    // If a photo is present, add it to the JSON object
    if (req.file) {
      eventObj.photo = prepareImage(req.file);
    }

    return result.save(eventObj).then(function() {
      res.status(200).json({data: result});
    }, function(error) {
      console.log(error);
      res.status(400).end();
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

// Send event to ALL users
function sendToAll(savedEventObj, req, res) {
  console.log('inside all');

  return usersQuery.find().then(function(results) {
    _.each(results, function(userObj) {
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

      return newUsersEvents.save(usersEventsObj).then(function() {
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
  console.log('inside spec');

  usersQuery.equalTo('loyaltyLevelId', loyaltyLevelObj);
  return usersQuery.find().then(function(results) {
    _.each(results, function(userObj) {
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

      return newUsersEvents.save(usersEventsObj).then(function() {
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

// Prepare photo for upload to Parse
// TODO: Do I need to make sure file saves to Parse first??
function prepareImage(file) {
  var photoPath = fs.readFileSync(file.path);
  var photoData = Array.prototype.slice.call(new Buffer(photoPath), 0);
  var photoFile = new Parse.File(file.originalname, photoData);

  return photoFile;
}
