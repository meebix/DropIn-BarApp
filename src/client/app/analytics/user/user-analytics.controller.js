(function () {
  'use strict';

  angular
    .module('app.analytics.user')
    .controller('UserAnalyticsController', UserAnalyticsController);

  UserAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function UserAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'User Analytics';
    vm.statsData = statsData;
    vm.chartActiveUsersByCredit = chartActiveUsersByCredit;
    vm.init = init;

    function statsData() {
      analyticService.userStats().then(function(results) {
        vm.userStats = results.data;
        vm.calcDate = $filter('date')(vm.userStats.calcDate.iso, 'MM/dd/yyyy');
        vm.barName = vm.userStats.barId.name;

        // Stats
        vm.activeUsersByCredit = vm.userStats.activeUsersByCredit;
      }).then(function() {
        return analyticService.singleDropinStats().then(function(results) {
          vm.singleDropinStats = results.data;

          // Stats
          vm.totalActiveUsersByCredit = vm.singleDropinStats.totalActiveUsersByCredit;
        });
      }).then(function() {
        vm.chartActiveUsersByCredit();
      });
    }

    // Active users by credit breakdown chart data
    function chartActiveUsersByCredit() {
      vm.labelsActiveUsers = [''];
      vm.seriesActiveUsers = [''];
      vm.coloursActiveUsers = ['#0084C1', '#00A447'];
      vm.chartOptionsActiveUsers = {
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataActiveUsers = [[vm.totalActiveUsersByCredit], [vm.activeUsersByCredit]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
