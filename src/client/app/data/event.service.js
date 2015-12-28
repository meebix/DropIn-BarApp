(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('eventService', eventService);

  eventService.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function eventService($http, $q, logger) {
    var service = {
      allEvents: allEvents,
      createEvent: createEvent,
      showEvent: showEvent,
      updateEvent: updateEvent,
      deleteEvent: deleteEvent
    };

    return service;

    function allEvents() {
      return $http({
        method: 'GET',
        url: '/api/v1/events',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function createEvent(eventObj, photo) {
      // Needed to encode photo file and rest of JSON form data
      var formData = new FormData();
      formData.append('eventData', JSON.stringify(eventObj));
      formData.append('photo', photo);

      return $http({
        method: 'POST',
        url: '/api/v1/events',
        data: formData,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity,
      }).then(function(response) {
        return response.data;
      });
    }

    function showEvent(eventId) {
      return $http({
        method: 'GET',
        url: '/api/v1/events/' + eventId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function updateEvent(eventId, eventObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/events/' + eventId,
        headers: {
          'Content-Type': 'application/json'
        },
        data: eventObj
      }).then(function(response) {
        return response.data;
      });
    }

    function deleteEvent(eventId) {
      return $http({
        method: 'DELETE',
        url: '/api/v1/events/' + eventId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
