(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('rewardService', rewardService);

  rewardService.$inject = ['$http', '$q', 'logger', '$cookieStore'];
  /* @ngInject */
  function rewardService($http, $q, logger, $cookieStore) {
    var service = {
      allRewards: allRewards,
      showReward: showReward,
      updateReward: updateReward
    };

    return service;

    function allRewards() {
      return $http({
        method: 'GET',
        url: '/api/v1/rewards',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function showReward(barId) {
      return $http({
        method: 'GET',
        url: '/api/v1/rewards/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function updateReward(barId, barObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/rewards/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
        data: barObj
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
