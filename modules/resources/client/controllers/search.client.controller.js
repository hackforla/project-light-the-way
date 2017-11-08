(function() {
  'use strict';

  // Resources controller
  angular
    .module('resources')
    .controller('ResourcesSearchController', ResourcesSearchController);

  ResourcesSearchController.$inject = ['$state', '$location', 'ResourcesService'];

  function ResourcesSearchController($state, $location, resources) {
    var vm = this;

    vm.form = {};
    vm.search = {};
    vm.search.query = getQuery() || '';
    vm.resources = '';
    vm.error = '';

    vm.type = 'header-nav-results';

    vm.fn = {};
    vm.fn.get = get;

    vm.query = $state.params.query;

    function filterQuery(){
      return vm.search.query.split(' ').join('+');
    }

    function getQuery() {
      return $state.params.query.split('+').join(' ');
    }

    function get() {
      var query = filterQuery();

      resources.searchResource(query).get(success, fail);

      function success(d){
        vm.search.error = '';
        vm.resources = d.data;
        $location.path('/r/search/' + query);
      }

      function fail(err){
        vm.resources = '';
        vm.search.error = err.data.msg;
        $location.path('/r/search/' + query);
      }
    }

    if ($state.params.query) {
      get();
    }

  }
}());
