(function () {
  'use strict';

  angular
    .module('dire')
    .controller('DireListController', DireListController);

  DireListController.$inject = ['DireService'];

  function DireListController(DireService) {
    var vm = this;

    vm.dire = DireService.query();
  }
}());
