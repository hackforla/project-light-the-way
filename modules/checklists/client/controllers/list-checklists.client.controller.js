(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('ChecklistsListController', ChecklistsListController);

  ChecklistsListController.$inject = ['ChecklistsService'];

  function ChecklistsListController(ChecklistsService) {
    var vm = this;

    vm.checklists = ChecklistsService.query();
  }
}());
