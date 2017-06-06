(function () {
  'use strict';

  angular
    .module('dires')
    .controller('DiresListController', DiresListController);

  DiresListController.$inject = ['DiresService'];

  function DiresListController(DiresService) {
    var vm = this;

    vm.dires = DiresService.query();
  }
}());
