(function () {
  'use strict';

  angular
    .module('app.analytics.event')
    .controller('EventAnalyticsController', EventAnalyticsController);

  EventAnalyticsController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function EventAnalyticsController($q, logger) {
    var vm = this;
    vm.title = 'Event Analytics';
  }
})();
