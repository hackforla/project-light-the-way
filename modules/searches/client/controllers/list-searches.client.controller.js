(function () {
  'use strict';

  angular
    .module('searches')
    .controller('SearchesListController', SearchesListController);

  SearchesListController.$inject = ['SearchesService'];

  function SearchesListController(SearchesService) {
    var vm = this;

    vm.searches = SearchesService.query();
  }
}());
