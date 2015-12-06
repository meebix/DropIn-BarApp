(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('helperService', helperService);

  helperService.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function helperService($http, $q, logger) {
    var service = {
      getBars: getBars,
      getLoyaltyLevels: getLoyaltyLevels
    };

    return service;

    function getBars() {
      return $http({
        method: 'GET',
        url: '/api/v1/helpers/bars',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function getLoyaltyLevels() {
      return $http({
        method: 'GET',
        url: '/api/v1/helpers/loyalty-levels',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
