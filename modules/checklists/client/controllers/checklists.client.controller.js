(function () {
  'use strict';

  // Checklists controller
  angular
    .module('checklists')
    .controller('ChecklistsController', ChecklistsController);

  ChecklistsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'checklistResolve'];

  function ChecklistsController ($scope, $state, $window, Authentication, checklist) {
    var vm = this;

    vm.authentication = Authentication;
    vm.checklist = checklist;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Checklist
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.checklist.$remove($state.go('checklists.list'));
      }
    }

    // Save Checklist
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.checklistForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.checklist._id) {
        vm.checklist.$update(successCallback, errorCallback);
      } else {
        vm.checklist.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('checklists.view', {
          checklistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
