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
    vm.chartGender = chartGender;
    vm.chartLoyaltyLevel = chartLoyaltyLevel;
    vm.init = init;

    function statsData() {
      analyticService.userStats().then(function(results) {
        vm.userStats = results.data;

        // Stats
        vm.activeUsersByCredit = vm.userStats.activeUsersByCredit;
      }).then(function() {
        return analyticService.dropinStats().then(function(results) {
          vm.dropinStats = results.data;

          // Stats
          vm.totalMales = vm.dropinStats.totalMales;
          vm.totalFemales = vm.dropinStats.totalFemales;
          vm.totalGuests = vm.dropinStats.totalGuests;
          vm.totalRegulars = vm.dropinStats.totalRegulars;
          vm.totalVips = vm.dropinStats.totalVips;
        });
      }).then(function() {
        vm.chartGender();
        vm.chartLoyaltyLevel();
      });
    }

    // Gender breakdown chart data
    function chartGender() {
      vm.labelsGender = ['Males', 'Females'];
      vm.seriesGender = ['Males', 'Females'];
      vm.chartOptionsGender = {
        tooltipTemplate: '<%= value %>',
        onAnimationComplete: function() {
          this.showTooltip(this.segments, true);
        },
        tooltipEvents: [],
        showTooltips: true
      };

      vm.dataGender= [vm.totalMales, vm.totalFemales];
    }

    // Gender breakdown chart data
    function chartLoyaltyLevel() {
      vm.labelsLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.seriesLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.chartOptionsLoyaltyLevel = {
        tooltipTemplate: '<%= value %>',
        onAnimationComplete: function() {
          this.showTooltip(this.segments, true);
        },
        tooltipEvents: [],
        showTooltips: true
      };

      vm.dataLoyaltyLevel= [vm.totalGuests, vm.totalRegulars, vm.totalVips];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
