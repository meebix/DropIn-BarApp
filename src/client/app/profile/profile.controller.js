(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$q', 'logger', '$state', '$stateParams', 'profileService'];
  /* @ngInject */
  function ProfileController($q, logger, $state, $stateParams, profileService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.barId = $stateParams.id;
    vm.allProfiles = allProfiles;
    vm.createProfile = createProfile;
    vm.showProfile = showProfile;
    vm.updateProfile = updateProfile;
    vm.deleteProfile = deleteProfile;
    vm.init = init;

    function allProfiles() {
      profileService.allProfiles().then(function(results) {
        vm.allProfiles = results.data;
      }, function(error) {
        // Error
      });
    }

    function createProfile(profileData) {
      profileService.createProfile(profileData).then(function() {
        $state.go('profiles');
      }, function(error) {
        // Error
      });
    }

    function showProfile() {
      profileService.showProfile(vm.barId).then(function(results) {
        vm.profileData = results.data;
      });
    }

    function updateProfile(profileData) {
      profileService.updateProfile(vm.barId, profileData).then(function() {
        $state.go('profiles');
      });
    }

    function deleteProfile() {
      profileService.deleteProfile(vm.barId).then(function() {
        $state.go('profiles');
      });
    }

    function init() {
      vm.allProfiles();

      if ($stateParams.id) {
        vm.showProfile();
      }
    }

    vm.init();
  }
})();
