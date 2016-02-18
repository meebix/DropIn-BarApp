(function () {
  'use strict';

  angular
    .module('app.help')
    .controller('HelpController', HelpController);

  HelpController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function HelpController($q, logger) {
    var vm = this;
    vm.title = 'Help';
  }
})();
