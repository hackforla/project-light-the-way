(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('AddChecklistItemController', AddChecklistItemController);

  AddChecklistItemController.$inject = ['ChecklistStorageService', 'ChecklistsService', 'LocateService', 'CategoriesService'];

  function AddChecklistItemController(checklistStorage, checklist, location, categories) {
    var vm = this;
    vm.fn = {};

    vm._id = '';
    vm.list = {};
    vm.email = 'email@email.com'; // this will be replaced by server's email set variables for testing

    vm.fn = {};
    vm.fn.add = add;
    vm.fn.remove = remove;
    vm.fn.emailList = emailList;
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

    function emailList(){
      var body = vm.checklist.join(',');
      body = '5a02a13d8bf90ddc382ae7b1,5a02a13d8bf90ddc382ae7b1,5a02a13d8bf90ddc382ae7b1,5a02a13d8bf90ddc382ae7b1';
      checklist.sendChecklist().save({ checklist: body }, function(err, d){
        if (err) {console.log(err);}
        console.log(d);
      });
    }

  }
}());
