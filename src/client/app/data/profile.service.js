(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('profileService', profileService);

  profileService.$inject = ['$http', '$q', 'logger', '$cookieStore'];
  /* @ngInject */
  function profileService($http, $q, logger, $cookieStore) {
    var service = {
      getProfileData: getProfileData,
      updateProfileData: updateProfileData
    };

    return service;

    function getProfileData(barId) {
      return $http({
        method: 'GET',
        url: '/api/v1/profile/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function updateProfileData(barObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/profile/' + barObj.barId,
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
