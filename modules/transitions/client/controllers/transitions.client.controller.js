(function () {
  'use strict';

  // Transitions controller
  angular
    .module('transitions')
    .controller('TransitionsController', TransitionsController);

  TransitionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'transitionResolve'];

  function TransitionsController ($scope, $state, $window, Authentication, transition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.transition = transition;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Transition
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.transition.$remove($state.go('transitions.list'));
      }
    }

    // Save Transition
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.transitionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.transition._id) {
        vm.transition.$update(successCallback, errorCallback);
      } else {
        vm.transition.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('transitions.view', {
          transitionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
