(function () {
  'use strict';

  // Checklists controller
  angular
    .module('checklists')
    .controller('ChecklistsController', ChecklistsController);

  ChecklistsController.$inject = ['ChecklistsService'];

  function ChecklistsController (checklist) {
    var vm = this;
    vm.fn = {};
    vm.checklist = {};
    vm.checklist.email = 'email';
    checklist.status().get(function(d){
      console.log(d);
    });

    


    // checklist.mail().post(vm.checklist, function(err, d){
    //   if (err) {console.log(err);}
    //   console.log(d);
    // });


  }
}());
