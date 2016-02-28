/*jshint node:true*/
'use strict';

// Requires
var Parse = require('parse/node').Parse;
var _ = require('underscore');
var moment = require('moment');
var currentUserBarObj = require('../auth/auth.controller').currentUserBarObj;
var four0four = require('../../utils/404')();

var Events = Parse.Object.extend('Events');
var EventStats = Parse.Object.extend('Stats_Events');

// Export
module.exports = {
  statsData: statsData,
  allEventsData: allEventsData
};

// Route Logic
function statsData(req, res) {
  var eventQuery = new Parse.Query(Events);
  var eventStats = new Parse.Query(EventStats);

  eventQuery.equalTo('objectId', req.params.id);
  eventQuery.first().then(function(eventObj) {
    eventStats.equalTo('eventId', eventObj);
    eventStats.equalTo('barId', currentUserBarObj());
    eventStats.include('eventId');
    eventStats.descending('calcDate');
    return eventStats.first().then(function(results) {
      res.status(200).json({data: results});
    }, function(error) {
      res.status(400).end();
    });
  });
}

function allEventsData(req, res) {
  var eventsQuery = new Parse.Query(Events);
  var page = req.query.page;
  var displayLimit = 15;
  var count;

  eventsQuery.equalTo('barId', currentUserBarObj());
  eventsQuery.notEqualTo('markedForDeletion', true);
  eventsQuery.include('loyaltyLevelId');
  eventsQuery.limit(displayLimit);
  eventsQuery.skip(page * displayLimit);
  eventsQuery.count().then(function(result) {
    count = result;
  })
  .then(function() {
    return eventsQuery.find().then(function(events) {
      var filteredEvents = _.filter(events, function(result) {
        var startDate = moment(result.attributes.eventStart);
        var yesterday = moment().subtract(1, 'days').hours(10).minute(15).second(0).millisecond(0);

        if (startDate.isBefore(yesterday)) {
          return result;
        }
      });

      var jsonData = {};
      jsonData.data = filteredEvents;
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
