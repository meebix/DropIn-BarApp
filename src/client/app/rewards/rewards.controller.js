(function () {
  'use strict';

  angular
    .module('app.rewards')
    .controller('RewardsController', RewardsController);

  RewardsController.$inject = ['$rootScope', '$q', 'logger', '$state', '$stateParams', 'rewardService'];
  /* @ngInject */
  function RewardsController($rootScope, $q, logger, $state, $stateParams, rewardService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.barId = $stateParams.id;
    vm.allRewards = allRewards;
    vm.showReward = showReward;
    vm.updateReward = updateReward;
    vm.goToShow = goToShow;
    vm.errorMessage;
    vm.init = init;

    function allRewards() {
      rewardService.allRewards().then(function(results) {
        vm.allRewards = results.data;
      }, function(error) {
        // Error
      });
    }

    function showReward() {
      rewardService.showReward(vm.barId).then(function(results) {
        vm.rewardData = results.data;
      });
    }

    function updateReward(rewardData) {
      rewardService.updateReward(vm.barId, rewardData).then(function() {
        $state.go('rewards').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully updated reward'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.error;
      });
    }

    function goToShow(rewardId) {
      $state.go('reward-edit', {id: rewardId});
    }

    function init() {
      vm.allRewards();

      if ($stateParams.id) {
        vm.showReward();
      }
    }

    vm.init();
  }
})();
