(function () {
  'use strict';

  angular
    .module('transitions')
    .controller('TransitionsListController', TransitionsListController);

  TransitionsListController.$inject = ['TransitionsService'];

  function TransitionsListController(TransitionsService) {
    var vm = this;

    vm.transitions = TransitionsService.query();
  }
}());
