(function () {
  'use strict';

  // Checklists controller
  angular
    .module('checklists')
    .controller('ChecklistController', ChecklistController);

  ChecklistController.$inject = ['$state', 'ChecklistsService'];

  function ChecklistController ($state, checklist) {
    var vm = this;

    vm.fn = {};
    vm.fn.email = email;

    vm.sent = false;
    vm.email = '';

    vm.list = {};
    vm._id = $state.params.checklistId;

    checklist.list(vm._id).get(function(d){
      vm.list = d;
    });

    function email(){
      if(vm.email){

        var to = {
          email:vm.email,
          _id: vm._id
        };
        checklist.send().save({ to:to }, function(d){
          vm.sent = true;
        });
      }
    }
  }
}());
