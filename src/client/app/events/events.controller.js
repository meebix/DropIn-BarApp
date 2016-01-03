(function () {
  'use strict';

  angular
    .module('app.events')
    .controller('EventsController', EventsController);

  EventsController.$inject = ['$q', 'logger', '$state', '$stateParams', 'moment', 'eventService', 'helperService'];
  /* @ngInject */
  function EventsController($q, logger, $state, $stateParams, moment, eventService, helperService) {
    var vm = this;
    vm.title = 'Events';
    vm.eventId = $stateParams.id;
    vm.allEvents = allEvents;
    vm.createEvent = createEvent;
    vm.showEvent = showEvent;
    vm.updateEvent = updateEvent;
    vm.deleteEvent = deleteEvent;
    vm.getLoyaltyLevels = getLoyaltyLevels;
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

    // REST calls
    function allEvents() {
      eventService.allEvents({ limitByDate: true }).then(function(results) {
        vm.allEvents = results.data;
      }, function(error) {
        // Error
      });
    }

    function createEvent(eventData) {
      // Convert dates to ISO string (local time)
      eventData.eventStart = moment(eventData.eventStart).format();
      eventData.eventEnd = moment(eventData.eventEnd).format();
      eventData.photo = vm.cropper.croppedImage;

      eventService.createEvent(eventData).then(function() {
        $state.go('events');
      }, function(error) {
        // Error
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
        photo: vm.cropper.croppedImage,
        eventStart: moment(eventData.eventStart.iso).format(),
        eventEnd: moment(eventData.eventEnd.iso).format()
      };

      eventService.updateEvent(vm.eventId, updatedEventData).then(function() {
        $state.go('events');
      });
    }

    function deleteEvent() {
      eventService.deleteEvent(vm.eventId).then(function() {
        $state.go('events');
      });
    }

    function getLoyaltyLevels() {
      helperService.getLoyaltyLevels().then(function(results) {
        vm.loyaltyLevels = results.data;
      });
    }

    // Datetime Picker
      // Defaults
    vm.eventData = {};
    vm.eventData.eventStart = moment(new Date()).minute(0).format();
    vm.eventData.eventEnd = moment(new Date()).add(3, 'hours').minute(0).format();

      // Options
    vm.minDate = new Date();

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
