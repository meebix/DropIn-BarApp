(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$q', 'logger', '$stateParams', 'profileService'];
  /* @ngInject */
  function ProfileController($q, logger, $stateParams, profileService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.barId = $stateParams.id;
    vm.getProfileData = getProfileData;
    vm.updateProfileData = updateProfileData;
    vm.init = init;

    function getProfileData() {
      profileService.getProfileData(vm.barId).then(function(profileData) {
        vm.profileData = profileData;
      });
    }

    function updateProfileData(profileData) {
      profileData.barId = vm.barId;

      profileService.updateProfileData(profileData);
    }

    function init() {
      vm.getProfileData();
    }

    vm.init();
  }
})();
