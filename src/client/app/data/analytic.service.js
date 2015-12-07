(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('analyticService', analyticService);

  analyticService.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function analyticService($http, $q, logger) {
    var service = {
      dropinStats: dropinStats,
      eventStats: eventStats,
      rewardStats: rewardStats,
      trafficStats: trafficStats,
      userStats: userStats
    };

    return service;

    function dropinStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/dropin',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function eventStats() {
      return $http({
        method: 'GET',
        url: '/api/v1/analytics/events',
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
