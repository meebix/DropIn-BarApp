(function () {
  'use strict';

  angular
    .module('app.analytics.traffic')
    .controller('TrafficAnalyticsController', TrafficAnalyticsController);

  TrafficAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function TrafficAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'Traffic Analytics';
    vm.statsData = statsData;
    vm.barChart = barChart;
    vm.init = init;

    function statsData() {
      analyticService.trafficStats().then(function(results) {
        vm.trafficStats = results.data;
        vm.calcDate = $filter('date')(vm.trafficStats.calcDate.iso, 'MM/dd/yyyy');
        vm.barName = vm.trafficStats.barId.name;

        // Stats
        vm.visitsByCredit = vm.trafficStats.visitsByCredit;
      }).then(function() {
        return analyticService.dropinStats().then(function(results) {
          vm.dropinStats = results.data;

          // Stats
          vm.dropinVisitsByCredit = vm.dropinStats.totalTrafficByCredit;
        });
      }).then(function() {
        vm.barChart();
      });
    }

    // Bar chart data
    function barChart() {
      vm.labels = [vm.calcDate];
      vm.series = [vm.barName, 'Drop In'];

      vm.data = [[vm.visitsByCredit], [vm.dropinVisitsByCredit]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
