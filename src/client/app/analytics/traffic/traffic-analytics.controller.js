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

        // Stats
        vm.barTrafficValues = vm.trafficStats[0].slice(0, vm.trafficStats[0].length-1);
        vm.calcDates = vm.trafficStats[1].slice(0, vm.trafficStats[1].length-1);
        vm.barName = vm.trafficStats[2][0];
      }).then(function() {
        return analyticService.multipleDropinStats().then(function(results) {
          vm.multipleDropinStats = results.data;

          // Stats
          vm.dropinTrafficValues = vm.multipleDropinStats[0].slice(0, vm.multipleDropinStats[0].length-1);
        });
      }).then(function() {
        vm.chartTraffic();
      });
    }

    // Traffic breakdown chart data
    function chartTraffic() {
      vm.labelsTraffic = [vm.calcDates[0], vm.calcDates[1], vm.calcDates[2], vm.calcDates[3], vm.calcDates[4], vm.calcDates[5], vm.calcDates[6]];
      vm.seriesTraffic = ['Drop In', vm.barName];
      vm.coloursTraffic = ['#0084C1', '#F05523'];
      vm.chartOptionsTraffic = {
        multiTooltipTemplate: '<%= value %>',
        showTooltips: true,
        bezierCurve: false
        // legendTemplate : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li class="chart-label-inline"><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };

      vm.dataTraffic = [vm.dropinTrafficValues, vm.barTrafficValues];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
