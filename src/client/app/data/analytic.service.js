(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('analyticService', analyticService);

  analyticService.$inject = ['$http', '$rootScope', '$q', 'logger'];
  /* @ngInject */
  function analyticService($http, $rootScope, $q, logger) {
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
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/single-dropin',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }

    function multipleDropinStats() {
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/multiple-dropin',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }

    function eventStats(eventId) {
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/events/' + eventId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }

    function rewardStats() {
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/rewards',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }

    function trafficStats() {
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/traffic',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }

    function userStats() {
      $rootScope.dataLoaded = false;
      $rootScope.fadeBackground = true;

      return $http({
        method: 'GET',
        url: '/api/v1/analytics/users',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        $rootScope.fadeBackground = false;
        return response.data;
      });
    }
  }
})();
