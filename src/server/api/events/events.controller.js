/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var crypto = require('crypto');
var _ = require('underscore');
var moment = require('moment');
var currentUserObj = require('../auth/auth.controller').currentUserObj;
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();
var logger = require('log4js').getLogger();
var validator = require('../../validations/validator');
var models = require('../../validations/models');

var Events = Parse.Object.extend('Events');
var Role = Parse.Object.extend('Role');
var LoyaltyLevels = Parse.Object.extend('Loyalty_Levels');
var UsersEvents = Parse.Object.extend('Users_Events');
var UsersBarAlgo = Parse.Object.extend('Users_Bar_Algo');
var EventStats = Parse.Object.extend('Stats_Events');

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
  var page = req.query.page;
  var displayLimit = 15;
  var count;

  var lessThanDate = moment(new Date()).add(100, 'years')._d;
  var greaterThanDate = new Date();
  eventsQuery.equalTo('barId', currentUserBarObj());
  eventsQuery.notEqualTo('markedForDeletion', true);
  eventsQuery.lessThan('eventStart', lessThanDate);
  eventsQuery.greaterThan('eventStart', greaterThanDate);
  eventsQuery.include('loyaltyLevelId');
  eventsQuery.limit(displayLimit);
  eventsQuery.skip(page * displayLimit);
  eventsQuery.count().then(function(result) {
    count = result;
  })
  .then(function() {
    return eventsQuery.find().then(function(events) {
      var jsonData = {};
      jsonData.data = events;
      jsonData.page = page;
      jsonData.displayLimit = displayLimit;
      jsonData.count = count;

      res.status(200).json(jsonData);
    }, function(error) {
      logger.error('Cannot get events from DB');
      res.status(200).json({error: 'Cannot get events. Please try again later or contact support.'});
    });
  });
}

function createEvent(req, res) {
  var newEvent = new Events();
  var loyaltyQuery = new Parse.Query(LoyaltyLevels);
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

    // Validations
    validator.validate(eventObj, models.eventModel, function(errorMessage) {
      if (errorMessage) {
        res.status(400).json({validationError: errorMessage});
      } else {
        // Save the event
        return newEvent.save(eventObj).then(function(savedEventObj) {
          return savedEventObj;
        }, function(error) {
          // Error saving: New Event Object
          console.log(error);
          res.status(400).end();
        })
        .then(function(savedEventObj) {
          var roleQuery = new Parse.Query(Role);

          // Get the role object for 'User'
          roleQuery.equalTo('name', 'User');
          return roleQuery.first().then(function(roleObj) {
            return roleObj;
          }, function(error) {
            // Error retrieving: Role Object
            console.log(error);
            res.status(400).end();
          })
          .then(function(roleObj) {
            var loyaltyQuery = new Parse.Query(LoyaltyLevels);

            loyaltyQuery.equalTo('name', 'All');
            return loyaltyQuery.first().then(function(allObj) {
              var usersQuery = new Parse.Query(Parse.User);

              // Find all users who have a role of 'User' and for each user
              // save a new UsersEvents to the join table
              usersQuery.equalTo('roleId', roleObj);

              if (loyaltyLevelObj.id !== allObj.id) {
                console.log('IF block executed because ALL was NOT called');
                console.log(loyaltyLevelObj.id, allObj.id);
                usersQuery.equalTo('loyaltyLevelId', loyaltyLevelObj);
              }

              usersQuery.limit(1000);
              return usersQuery.find().then(function(userObjs) {
                console.log('*** USER COUNT WITH LOYALTY LEVEL ***', userObjs.length);

                return userObjs;
              })
              .then(function(userObjs) {
                var usersBarAlgoQuery = new Parse.Query(UsersBarAlgo);

                usersBarAlgoQuery.containedIn('userId', userObjs);
                return usersBarAlgoQuery.find().then(function(results) {
                  console.log('*** ALGO COUNT ***', results.length);

                  if (results.length === 0) res.status(200).end();

                  _.each(results, function(algoObj) {
                    console.log('--- INSIDE EACH ---', algoObj.id);

                    if (algoObj.attributes.barId.id === currentUserBarObj().id) {
                      var newUsersEvents = new UsersEvents();

                      var usersEventsObj = {
                        eventId: savedEventObj,
                        userId: algoObj.attributes.userId,
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
                    }
                  });
                });
              });
            });
          });
        });
      }
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

    // Image
    if (req.body.photo !== null) {
      eventObj.photo = prepareImageForParse(req.body.photo);
    }

    // Validations
    validator.validate(eventObj, models.eventModel, function(errorMessage) {
      if (errorMessage) {
        res.status(400).json({validationError: errorMessage});
      } else {
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
            usersEventsQuery.limit(1000);
            usersEventsQuery.find().then(function(results) {
              _.each(results, function(obj) {
                obj.set('eventStart', transformDateForParse(req.body.eventStart));
                obj.set('eventEnd', transformDateForParse(req.body.eventEnd));
                obj.save();
              });

              res.status(200).end();
            }, function(error) {
              // Error saving to Users Events table
              console.log(error);
            });
          });
        });
      }
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
    usersEventsQuery.limit(1000);
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

// This just creates a date object for Parse to read
// Parse seems to be converting date to UTC before storing it automatically
function transformDateForParse(date) {
  var newDate = new Date(date);

  return newDate;
}

// Prepare image for Parse
function prepareImageForParse(image) {
  var base64Image = image.replace(/^data:image\/png;base64,/, '');
  var checkSum = crypto.randomBytes(15).toString('hex');

  var photoFile = new Parse.File(checkSum + '.png', {base64: base64Image});

  return photoFile;
}
