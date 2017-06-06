(function () {
  'use strict';

  angular
    .module('veterans')
    .controller('VeteransListController', VeteransListController);

  VeteransListController.$inject = ['VeteransService'];

  function VeteransListController(VeteransService) {
    var vm = this;

    vm.veterans = VeteransService.query();
  }
}());
