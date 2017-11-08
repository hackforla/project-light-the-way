(function () {
  'use strict';

  angular
    .module('shared')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$location', '$filter'];

  function SearchController($location, $filter) {
    var vm = this;
    vm.fn = {};
    vm.fn.search = search;
    vm.query = '';

    function search(q){
      $location.path('/r/search/' + $filter('url')(q));
    }
  }
}());
