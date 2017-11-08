(function () {
  'use strict';

  angular
    .module('vets')
    .controller('VetsListController', VetsListController);

  VetsListController.$inject = ['VetsService'];

  function VetsListController(VetsService) {
    var vm = this;

    vm.vets = VetsService.query();
  }
}());
