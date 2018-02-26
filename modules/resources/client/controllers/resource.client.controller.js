(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourceReadController', ResourceReadController);

  ResourceReadController.$inject = ['$state', 'ResourcesService', 'ChecklistStorageService'];

  function ResourceReadController($state, resources, checklistStorage) {
    var vm = this;
    vm._id = $state.params.resourceId;
    vm.checklist = checklistStorage.get();
    vm.distance = false; // Will get toggle on filter system change
    vm.distance = true; // temp

    vm.inChecklist = vm.checklist.indexOf(vm._id) !== -1;

    resources.getResource(vm._id).get(function(d){
      vm.resource = d.data;
      vm.resource.distance = '1.2 miles away';
    });
  }
}());
