(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('analyticService', analyticService);

  analyticService.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function analyticService($http, $q, logger) {
    var service = {
      singleDropinStats: singleDropinStats,
      multipleDropinStats: multipleDropinStats,
      eventStats: eventStats,
      rewardStats: rewardStats,
      trafficStats: trafficStats,
      userStats: userStats
    };

    return service;

    function singleDropinStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/single-dropin',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function multipleDropinStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/multiple-dropin',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function eventStats(eventId) {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/events/' + eventId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function rewardStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/rewards',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function trafficStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/traffic',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function userStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/users',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
