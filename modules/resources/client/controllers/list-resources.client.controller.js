(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourcesListController', ResourcesListController);

  ResourcesListController.$inject = ['ResourcesService'];

  function ResourcesListController(resources) {
    var vm = this;

    resources.resources().get(function(d){
      vm.resources = d.data;
    });
  }
}());
