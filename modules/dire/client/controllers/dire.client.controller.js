(function () {
  'use strict';

  // Dire controller
  angular
    .module('dire')
    .controller('DireController', DireController);

  DireController.$inject = ['$scope', '$state', '$window', 'Authentication', 'direResolve'];

  function DireController ($scope, $state, $window, Authentication, dire) {
    var vm = this;

    vm.authentication = Authentication;
    vm.dire = dire;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Dire
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.dire.$remove($state.go('dire.list'));
      }
    }

    // Save Dire
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.direForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dire._id) {
        vm.dire.$update(successCallback, errorCallback);
      } else {
        vm.dire.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('dire.view', {
          direId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
