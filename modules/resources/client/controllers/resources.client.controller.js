(function () {
  'use strict';

  // Resources controller
  angular
    .module('resources')
    .controller('ResourcesController', ResourcesController);

  ResourcesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'resourceResolve'];

  function ResourcesController ($scope, $state, $window, Authentication, resource) {
    var vm = this;

    vm.authentication = Authentication;
    vm.resource = resource;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Resource
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.resource.$remove($state.go('resources.list'));
      }
    }

    // Save Resource
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.resourceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.resource._id) {
        vm.resource.$update(successCallback, errorCallback);
      } else {
        vm.resource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('resources.view', {
          resourceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
