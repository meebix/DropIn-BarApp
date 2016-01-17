(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 5000;
    toastr.options.extendedTimeOut = 5000;
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.closeButton = true;
    toastr.options.preventDuplicates = true;
  }

  var config = {
    appErrorPrefix: '[app Error] ',
    appTitle: 'app'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});
  }

  core.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: '#000000', position: 'relative'});
    usSpinnerConfigProvider.setTheme('table', {top: '150px'});
    usSpinnerConfigProvider.setTheme('page', {top: '100px'});
  }]);

})();
