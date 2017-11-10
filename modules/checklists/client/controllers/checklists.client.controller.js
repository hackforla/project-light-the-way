(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('ChecklistsController', ChecklistsController);

  ChecklistsController.$inject = ['ChecklistStorageService', 'ChecklistsService', 'LocateService', 'CategoriesService', 'ResourcesService'];

  function ChecklistsController(checklistStorage, checklist, location, categories, resources) {
    var vm = this;

    vm._id = '';
    vm.email = 'email@email.com'; // this will be replaced by server's email set variables for testing
    vm.fn = {};
    vm.fn.locate = location.locate;
    vm.fn.results = results;
    vm.fn.list = list;

    vm.list = {};
    vm.checked = [];

    vm.test = 'Hello';
    categories.categories().get(function(d){
      vm.categories = d.data;
    });
    vm.checklist = checklistStorage.get();

    function list(item){
      var index = vm.checked.indexOf(item);
      if(index === -1){
        vm.checked.push(item);
      }else{
        vm.checked.splice(index, 1);
      }
    }

    function results(){
      if(vm.checked.length){
        resources.byCategories().save({ categories: vm.checked }, function(d){
          console.log(d);
        });
      }
    }

  }
}());
