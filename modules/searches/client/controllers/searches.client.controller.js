(function () {
  'use strict';

  // Searches controller
  angular
    .module('searches')
    .controller('SearchesController', SearchesController);

  SearchesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'searchResolve'];

  function SearchesController ($scope, $state, $window, Authentication, search) {
    var vm = this;

    vm.authentication = Authentication;
    vm.search = search;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.resources = '';

    // Remove existing Search
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.search.$remove($state.go('searches.list'));
      }
    }

    // Save Search
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.searchForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.search._id) {
        vm.search.$update(successCallback, errorCallback);
      } else {
        vm.search.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        console.log(res);
        vm.resources = res.results;

        vm.search.query = res.query;
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res;
      }
    }
  }
}());
