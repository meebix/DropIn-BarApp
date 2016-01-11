(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('profileService', profileService);

  profileService.$inject = ['$http', '$rootScope', '$q', 'logger', '$cookieStore'];
  /* @ngInject */
  function profileService($http, $rootScope, $q, logger, $cookieStore) {
    var service = {
      allProfiles: allProfiles,
      createProfile: createProfile,
      showProfile: showProfile,
      updateProfile: updateProfile,
      deleteProfile: deleteProfile
    };

    return service;

    function allProfiles() {
      $rootScope.dataLoaded = false;

      return $http({
        method: 'GET',
        url: '/api/v1/profiles',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        $rootScope.dataLoaded = true;
        return response.data;
      });
    }

    function createProfile(profileObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/profiles',
        headers: {
          'Content-Type': 'application/json'
        },
        data: profileObj
      }).then(function(response) {
        return response.data;
      });
    }

    function showProfile(barId) {
      return $http({
        method: 'GET',
        url: '/api/v1/profiles/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function updateProfile(barId, barObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/profiles/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
        data: barObj
      }).then(function(response) {
        return response.data;
      });
    }

    function deleteProfile(barId) {
      return $http({
        method: 'DELETE',
        url: '/api/v1/profiles/' + barId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
