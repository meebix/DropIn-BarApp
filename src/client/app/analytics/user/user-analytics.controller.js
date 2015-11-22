(function () {
  'use strict';

  angular
    .module('app.analytics.user')
    .controller('UserAnalyticsController', UserAnalyticsController);

  UserAnalyticsController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function UserAnalyticsController($q, logger) {
    var vm = this;
    vm.title = 'User Analytics';
  }
})();
