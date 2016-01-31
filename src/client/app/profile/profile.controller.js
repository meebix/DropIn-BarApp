(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$q', 'logger', '$state', '$stateParams', 'profileService'];
  /* @ngInject */
  function ProfileController($rootScope, $q, logger, $state, $stateParams, profileService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.barId = $stateParams.id;
    vm.allProfiles = allProfiles;
    vm.createProfile = createProfile;
    vm.showProfile = showProfile;
    vm.updateProfile = updateProfile;
    vm.deleteProfile = deleteProfile;
    vm.goToShow = goToShow;
    vm.errorMessage;
    vm.init = init;

    // Images
    vm.thumbnailPhoto = null;
    vm.detailPhoto = null;

    function allProfiles() {
      profileService.allProfiles().then(function(results) {
        vm.allProfiles = results.data;
      }, function(error) {
        // Error
      });
    }

    function createProfile(profileData) {
      profileData.thumbnail = vm.thumbnailPhoto;
      profileData.photo = vm.detailPhoto;

      profileService.createProfile(profileData).then(function() {
        $state.go('profiles').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully created new bar'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.validationError;
      });
    }

    function showProfile() {
      profileService.showProfile(vm.barId).then(function(results) {
        var isActive = results.data.isActive ? 'Active' : 'Inactive';
        vm.statusLabel = results.data.isActive ? 'label-success' : 'label-danger';

        vm.profileData = results.data;
        vm.isActive = isActive;
      });
    }

    function updateProfile(profileData) {
      // Build new form object for only editable fields
      var updatedProfileData = {
        name: profileData.name,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zip,
        phone: profileData.phone,
        email: profileData.email,
        description: profileData.description,
        thumbnail: vm.thumbnailPhoto,
        photo: vm.detailPhoto,
        beaconMajor: profileData.beaconMajor,
        beaconMinor: profileData.beaconMinor,
        latitude: profileData.latitude,
        longitude: profileData.longitude,
        mondayPromotion: profileData.mondayPromotion,
        tuesdayPromotion: profileData.tuesdayPromotion,
        wednesdayPromotion: profileData.wednesdayPromotion,
        thursdayPromotion: profileData.thursdayPromotion,
        fridayPromotion: profileData.fridayPromotion,
        saturdayPromotion: profileData.saturdayPromotion,
        sundayPromotion: profileData.sundayPromotion,
        isActive: profileData.isActive
      };

      profileService.updateProfile(vm.barId, updatedProfileData).then(function() {
        $state.go('profiles').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully updated bar'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.validationError;
      });
    }

    function deleteProfile() {
      profileService.deleteProfile(vm.barId).then(function() {
        $state.go('profiles').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully deleted bar'
          });
        });
      });
    }

    function goToShow(profileId) {
      $state.go('profile-show', {id: profileId});
    }

    // Select options for isActive
    vm.activeOptions = [
      { name: 'True', value: true },
      { name: 'False', value: false }
    ];

    function init() {
      vm.allProfiles();

      if ($stateParams.id) {
        vm.showProfile();
      }
    }

    vm.init();
  }
})();
