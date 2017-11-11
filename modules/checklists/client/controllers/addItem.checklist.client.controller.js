(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('AddChecklistItemController', AddChecklistItemController);

  AddChecklistItemController.$inject = ['ChecklistStorageService', 'ChecklistsService', 'LocateService', 'CategoriesService'];

  function AddChecklistItemController(checklistStorage, checklist, location, categories) {
    var vm = this;
    vm.fn = {};

    vm.list = {};

    vm.fn = {};
    vm.fn.add = add;
    vm.fn.remove = remove;
    vm.fn.emailList = emailList;
    vm.checklist = checklistStorage.get();
    update();

    function add(id){
      console.log('add');
      if(id){
        if(vm.checklist.indexOf(id) !== -1){
          remove(id);
        }else{
          checklistStorage.add(id);
        }
        update();
      }
    }

    function remove(id){
      checklistStorage.del(id);
      update();
    }

    function update(){
      vm.checklist = checklistStorage.get();
    }

    function emailList(){
      var body = vm.checklist.join(',');
      checklist.sendChecklist().save({ checklist: body }, function(err, d){
        if (err) {console.log(err);}
        console.log(d);
      });
    }

  }
}());
