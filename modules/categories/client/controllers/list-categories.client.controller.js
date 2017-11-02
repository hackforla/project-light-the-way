(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['CategoriesService'];

  function CategoriesListController(categories) {
    var vm = this;

    vm.categories = categories.getAll().get(function(d){
      vm.categories = d.data;
    });
  }
}());
