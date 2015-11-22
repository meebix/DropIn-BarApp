(function () {
  'use strict';

  angular
    .module('app.analytics.traffic')
    .controller('TrafficAnalyticsController', TrafficAnalyticsController);

  TrafficAnalyticsController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function TrafficAnalyticsController($q, logger) {
    var vm = this;
    vm.title = 'Traffic Analytics';
  }
})();
