(function () {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize', 'ngCookies',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.filters',
      'ui.router', 'ngplus', 'angularMoment', 'angularSpinner'
    ]);
})();
