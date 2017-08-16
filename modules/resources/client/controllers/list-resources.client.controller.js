(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourcesListController', ResourcesListController);

  ResourcesListController.$inject = ['ResourcesService'];

  function ResourcesListController(ResourcesService) {
    var vm = this;

    vm.resources = ResourcesService.query();
  }
}());
