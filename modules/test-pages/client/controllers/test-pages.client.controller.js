(function () {
  'use strict';

  // Test pages controller
  angular
    .module('test-pages')
    .controller('TestPagesController', TestPagesController);

  TestPagesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'testPageResolve'];

  function TestPagesController ($scope, $state, $window, Authentication, testPage) {
    var vm = this;

    vm.authentication = Authentication;
    vm.testPage = testPage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Test page
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.testPage.$remove($state.go('test-pages.list'));
      }
    }

    // Save Test page
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.testPageForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.testPage._id) {
        vm.testPage.$update(successCallback, errorCallback);
      } else {
        vm.testPage.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('test-pages.view', {
          testPageId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
