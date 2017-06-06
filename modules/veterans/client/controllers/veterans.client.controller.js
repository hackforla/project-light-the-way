(function () {
  'use strict';

  // Veterans controller
  angular
    .module('veterans')
    .controller('VeteransController', VeteransController);

  VeteransController.$inject = ['$scope', '$state', '$window', 'Authentication', 'veteranResolve'];

  function VeteransController ($scope, $state, $window, Authentication, veteran) {
    var vm = this;

    vm.authentication = Authentication;
    vm.veteran = veteran;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Veteran
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.veteran.$remove($state.go('veterans.list'));
      }
    }

    // Save Veteran
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.veteranForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.veteran._id) {
        vm.veteran.$update(successCallback, errorCallback);
      } else {
        vm.veteran.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('veterans.view', {
          veteranId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
