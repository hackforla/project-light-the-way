(function () {
  'use strict';

  // Checklists controller
  angular
    .module('checklists')
    .controller('ChecklistController', ChecklistController);

  ChecklistController.$inject = ['$state','ChecklistsService'];

  function ChecklistController ($state, checklist) {
    var vm = this;
    vm.fn = {};
    vm.list = {};

    vm.test = 'Hello';

    checklist.list($state.params.checklistId).get(function(d){
      vm.list = d;
      console.log(vm.list);
    });


  }
}());
