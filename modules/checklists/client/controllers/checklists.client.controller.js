(function () {
  'use strict';

  angular
    .module('checklists')
    .controller('ChecklistsController', ChecklistsController);

  ChecklistsController.$inject = ['$location','$state', 'ChecklistStorageService', 'ChecklistsService', 'LocateService', 'CategoriesService', 'ResourcesService'];

  function ChecklistsController($location, $state, checklistStorage, checklist, location, categories, resources) {
    var vm = this;

    vm.modal = false;
    vm._id = '';
    vm.email = 'email@email.com'; // this will be replaced by server's email set variables for testing
    vm.fn = {};
    vm.fn.locate = location.locate;
    vm.fn.results = results;
    vm.fn.list = list;
    vm.fn.view = view;

    vm.fn.modal = modal;

    vm.fn.update = update;

    function update(){
      vm.checklist = checklistStorage.get();
    }
    update();

    vm.list = {};
    vm.results = {};

    // vm.resultsShow = localStorage.getItem('checklist:mode') || false;
    var checked = localStorage.getItem('checklist:checked');
    if(checked){
      vm.checked = localStorage.getItem('checklist:checked').split(',');
    }else{
      vm.checked = [];
    }

    categories.categories().get(function(d){
      vm.categories = d.data;
    });

    if($state.current.name === 'checklist.list.resource'){
      vm.modal=true;
    }

    function modal(){
      if(vm.modal){
        $state.go('checklist.list');
      }
      vm.modal = !vm.modal;
    }

    function list(item){
      var index = vm.checked.indexOf(item);
      if(index === -1){
        vm.checked.push(item);
      }else{
        vm.checked.splice(index, 1);
      }
    }

    function results(f){
      if(vm.checked.length){
        localStorage.setItem('checklist:checked',vm.checked.join(','));
        vm.checked.forEach(function(c){
          resources.byCategories().save({ categories: [c] }, function(d){
            vm.results[c] = d.data;
          });
        });
        vm.resultsShow = !vm.resultsShow;
        localStorage.setItem('checklist:mode', vm.resultsShow);
      }
    }

    function view(){
      console.log('view list');
      var body = vm.checklist.join(',');
      checklist.sendChecklist().save({ checklist: body }, function(d){
        // if (err) {console.log(err);}
        // console.log(d);
        $location.path('/checklist/list-'+d._id);

      });
    }

    vm.addItem = function() {
      var newItemNo = vm.items.length + 1;
      vm.items.push('Item ' + newItemNo);
    };

  }
}());
