(function () {
  'use strict';

  // Categories controller
  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', '$window', 'CategoriesService'];

  function CategoriesController ($scope, $state, $window, categories) {
    var vm = this;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.fn = {};
    vm.fn.save = save;

    categories.categories().get(function(d){
      vm.categories = d.data;
    });



    function remove(n){
      categories.category(n).remove(function(d){
        if(d.removed){
          vm.categories.splice(vm.categories.indexOf(n), 1);
        }
      })
    }

    function save(){
      if(vm.form.name && (vm.categories.indexOf(vm.form.name) === -1)){
        categories.categories().save(
        {name: vm.form.name},
        function(d){
          add();
        },
        err
      )

        function add(){
          vm.categories.push(vm.form.name);
          vm.form.name = '';
        }
      }
    }


    function err(d){
      console.error(d);
    }
  }
}());
