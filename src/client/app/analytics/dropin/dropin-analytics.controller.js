(function () {
  'use strict';

  angular
    .module('app.analytics.user')
    .controller('DropinAnalyticsController', DropinAnalyticsController);

  DropinAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function DropinAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'User Analytics';
    vm.statsData = statsData;
    vm.chartGender = chartGender;
    vm.chartLoyaltyLevel = chartLoyaltyLevel;
    vm.chartAge = chartAge;
    vm.init = init;

    function statsData() {
      analyticService.singleDropinStats().then(function(results) {
        vm.singleDropinStats = results.data;
        vm.calcDate = vm.singleDropinStats.calcDate.iso

        // Stats
        vm.totalMales = vm.singleDropinStats.totalMales;
        vm.totalFemales = vm.singleDropinStats.totalFemales;
        vm.totalGenderUnknown = vm.singleDropinStats.totalGenderUnknown;
        vm.totalGuests = vm.singleDropinStats.totalGuests;
        vm.totalRegulars = vm.singleDropinStats.totalRegulars;
        vm.totalVips = vm.singleDropinStats.totalVips;
        vm.age2124 = vm.singleDropinStats.age2124;
        vm.age2529 = vm.singleDropinStats.age2529;
        vm.age3034 = vm.singleDropinStats.age3034;
        vm.age35Plus = vm.singleDropinStats.age35Plus;
        vm.totalActiveUsersByCredit = vm.singleDropinStats.totalActiveUsersByCredit;
      })
      .then(function() {
        vm.chartGender();
        vm.chartLoyaltyLevel();
        vm.chartAge();
      });
    }

    // Gender breakdown chart data
    function chartGender() {
      vm.labelsGender = ['Males', 'Females'];
      vm.coloursGender = ['#0B60F1', '#F44F72'];
      vm.chartOptionsGender = {
        segmentStrokeColor: '#EAEAEA',
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataGender = [vm.totalMales, vm.totalFemales];
    }

    // Loyalty level breakdown chart data
    function chartLoyaltyLevel() {
      vm.labelsLoyaltyLevels = [''];
      vm.seriesLoyaltyLevels = [''];
      vm.coloursLoyaltyLevels = ['#4C92FF', '#16A085', '#CCAC00'];
      vm.chartOptionsLoyaltyLevels = {
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataLoyaltyLevels = [[vm.totalGuests], [vm.totalRegulars], [vm.totalVips]];
    }

    // Age breakdown chart data
    function chartAge() {
      vm.labelsAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.seriesAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.coloursAge = ['#FFAA98', '#DE7862', '#BB513A', '#97301A'];
      vm.chartOptionsAge = {
        segmentStrokeColor: '#EAEAEA',
        segmentStrokeWidth: 7,
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataAge = [vm.age2124, vm.age2529, vm.age3034, vm.age35Plus];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
