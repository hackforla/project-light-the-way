(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('ChecklistsListController', ChecklistsListController);

  ChecklistsListController.$inject = ['ChecklistStorageService'];

  function ChecklistsListController(checklistStorage) {
    var vm = this;

    vm._id = '';
    vm.email = 'email@email.com';

    vm.fn = {};
    vm.fn.add = add;

    vm.fn.remove = remove;

    vm.checklist = checklistStorage.get();


    function add(){
      if(vm._id){
        checklistStorage.add(vm._id);
        vm.checklist = checklistStorage.get();
        vm._id = '';
      }
    }

    function remove(_id){
      checklistStorage.del(_id);
      vm.checklist = checklistStorage.get();
    }

  }
}());
