(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['Authentication', 'ContentService', 'CategoriesService', 'ResourcesService'];

  function HomePageController(Authentication, content, categories, resources) {
    var vm = this;

    vm.categories = [];
    vm.featured = [];
    vm.recent = [];

    categories.getAll().get(function(d){
      vm.categories = d.data;
    });

    resources.getNew().get(function(d){
      vm.recent = d.data;
    });

    resources.getFeatured().get(function(d){
      vm.featured = d.data;
    });

  }

}());
