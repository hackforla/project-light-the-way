(function () {
  'use strict';

  // Checklists controller
  angular
    .module('checklists')
    .controller('ChecklistResultController', ChecklistResultController);

  ChecklistResultController.$inject = ['$state', 'ChecklistsService'];

  function ChecklistResultController ($state, checklist) {
    var vm = this;

    vm.list = {};

    console.log('get list');
    checklist.list('5a0418cff094d773ad3f5ff4').get(function(d){
      vm.list = d;
      console.log(vm.list);
    });


  }
}());
