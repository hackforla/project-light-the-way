(function () {
  'use strict';

  // Admins controller
  angular
    .module('admins')
    .controller('AdminsController', AdminsController);

  AdminsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'adminResolve'];

  function AdminsController ($scope, $state, $window, Authentication, admin) {
    var vm = this;

    vm.authentication = Authentication;
    vm.admin = admin;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Admin
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.admin.$remove($state.go('admins.list'));
      }
    }

    // Save Admin
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.adminForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.admin._id) {
        vm.admin.$update(successCallback, errorCallback);
      } else {
        vm.admin.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admins.view', {
          adminId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
