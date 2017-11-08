(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['$filter', '$location', '$window', 'CategoriesService', 'ResourcesService'];

  function HomePageController($filter, $location, $window, categories, resources) {
    var vm = this;
    vm.categories = [];
    vm.featured = [];
    vm.recent = [];
    vm.form = {};

    vm.fn = {};
    vm.fn.search = search;

    categories.categories().get(function(d){
      vm.categories = d.data;
    });

    resources.getNew().get(function(d){
      vm.recent = d.data;
    });

    resources.getFeatured().get(function(d){
      vm.featured = d.data;
    });

    function search(){
      if(vm.form.search){
        $location.path('/r/search/' + $filter('url')(vm.form.search));
      }
    }

  }

}());
