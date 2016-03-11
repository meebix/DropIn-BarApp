(function () {
  'use strict';

  angular
    .module('app.events')
    .controller('EventsController', EventsController);

  EventsController.$inject = ['$scope', '$rootScope', '$q', 'logger', '$state', '$stateParams', '$timeout', 'moment', 'eventService', 'helperService', 'Cropper'];
  /* @ngInject */
  function EventsController($scope, $rootScope, $q, logger, $state, $stateParams, $timeout, moment, eventService, helperService, Cropper) {
    var vm = this;
    vm.title = 'Events';
    vm.eventId = $stateParams.id;
    vm.allEvents = allEvents;
    vm.createEvent = createEvent;
    vm.showEvent = showEvent;
    vm.updateEvent = updateEvent;
    vm.deleteEvent = deleteEvent;
    vm.getLoyaltyLevels = getLoyaltyLevels;
    vm.goToShow = goToShow;
    vm.currentPage = 0;
    vm.errorMessage;
    vm.eventsCreated = true;
    vm.init = init;

    // Image cropper options
    vm.cropper = {};
    vm.cropper.sourceImage = null;
    vm.cropper.croppedImage = null;

    vm.bounds = {};
    vm.bounds.left = 0;
    vm.bounds.right = 0;
    vm.bounds.top = 0;
    vm.bounds.bottom = 0;

    // New cropper
    var file;
    var data;
    $scope.showImage = false;
    $scope.showCropped = false;

    $scope.uploadFile = function(event){
      var blob = event.target.files[0];
      $scope.showImage = true;
      $scope.showCropped = false;
      $scope.newImage = true;
      $timeout(hideCropper);

      Cropper.encode((file = blob)).then(function(dataUrl) {
        $scope.showImage = true;
        $scope.dataUrl = dataUrl;
        $timeout(showCropper);  // wait for $digest to set image's src
      });
    };

    $scope.preview = function() {
      if (!file || !data) return;
      Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
        $scope.showCropped = true;
        $scope.showImage = false;
        $scope.newImage = true;
        ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
      });
    };

    $scope.options = {
      autoCropArea: 0.85,
      aspectRatio: 1 / 1,
      crop: function(dataNew) {
        data = dataNew;
      }
    };

    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';

    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }
    // End new cropper

    // REST calls
    function allEvents() {
      eventService.allEvents({ page: vm.currentPage }).then(function(results) {
        vm.eventsCreated = results.data.length !== 0;

        if (vm.eventsCreated) {
          vm.allEvents = results.data;

          vm.displayLimit = results.displayLimit;
          vm.count = results.count;
          vm.maxPage = Math.ceil(results.count / results.displayLimit) - 1;
        }
      }, function(error) {
        // Error
      });
    }

    function createEvent(eventData) {
      // Convert dates to ISO string (local time)
      eventData.eventStart = moment(eventData.eventStart).format();
      eventData.eventEnd = moment(eventData.eventEnd).format();
      eventData.photo = $scope.preview.dataUrl;

      eventService.createEvent(eventData).then(function() {
        $state.go('events').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully created new event'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.validationError;
      });
    }

    function showEvent() {
      eventService.showEvent(vm.eventId).then(function(results) {
        vm.eventData = results.data;
      });
    }

    function updateEvent(eventData) {
      // Build new form object for only editable fields
      var updatedEventData = {
        name: eventData.name,
        description: eventData.description,
        photo: $scope.preview.dataUrl,
        eventStart: moment(eventData.eventStart.iso).format(),
        eventEnd: moment(eventData.eventEnd.iso).format()
      };

      eventService.updateEvent(vm.eventId, updatedEventData).then(function() {
        $state.go('events').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully updated event'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.validationError;
      });
    }

    function deleteEvent() {
      eventService.deleteEvent(vm.eventId).then(function() {
        $state.go('events').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully deleted event'
          });
        });
      });
    }

    function getLoyaltyLevels() {
      helperService.getLoyaltyLevels().then(function(results) {
        vm.loyaltyLevels = results.data;
      });
    }

    function goToShow(eventId) {
      $state.go('events-show', {id: eventId});
    }

    // Datetime Picker
      // Defaults
    vm.eventData = {};
    vm.eventData.eventStart = moment(new Date()).add(1, 'hours').minute(0).format();
    vm.eventData.eventEnd = moment(new Date()).add(4, 'hours').minute(0).format();

      // Options
    vm.minDate = new Date();
    vm.hourStep = 1;
    vm.minuteStep = 15;
    vm.showMeridian = true;
    vm.dateOptions = {
      showWeeks: false
    };

    // Pagination
    vm.nextPage = function() {
      vm.currentPage++;
      allEvents();
    };

    vm.previousPage = function() {
      vm.currentPage--;
      allEvents();
    };

    vm.showNextPage = function() {
      return vm.currentPage < vm.maxPage;
    };

    vm.showPreviousPage = function() {
      return vm.currentPage !== 0;
    };

    function init() {
      vm.allEvents();
      vm.getLoyaltyLevels();

      if ($stateParams.id) {
        vm.showEvent();
      }
    }

    vm.init();
  }
})();
