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
    vm.chartTraffic = chartTraffic;
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
          vm.totalTrafficByCredit = vm.dropinStats.totalTrafficByCredit;
        });
      }).then(function() {
        vm.chartTraffic();
      });
    }

    // Traffic breakdown chart data
    function chartTraffic() {
      vm.labelsTraffic = ['Traffic'];
      vm.seriesTraffic = ['Drop In', 'Bar'];
      vm.coloursTraffic = ['#00CC2D', '#3611BE'];
      vm.chartOptionsTraffic = {
        multiTooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
      };

      vm.dataTraffic = [[vm.totalTrafficByCredit], [vm.visitsByCredit]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
