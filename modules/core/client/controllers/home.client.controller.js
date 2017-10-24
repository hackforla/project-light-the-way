(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['Authentication', 'ContentService', 'CategoriesService', 'ResourcesService'];

  function HomePageController(Authentication, content, categories, resources) {
    var vm = this;

    // This provides Authentication context.
    vm.authentication = Authentication;
    vm.categories = [];
    vm.featured = [];
    vm.recent = [];

    // For home view
    vm.home = {};
    vm.home.aboutus = content.getAboutUs();
    vm.home.title = 'Welcome to Project Light The Way';
    vm.home.slogan = 'Find the resources you need, and discover ones you did not know about';
    vm.home.logo = '/modules/core/client/img/brand/logo1.png';

    categories.getAll().get(function(d){
      vm.categories = d.data;
    });

    resources.getNew().get(function(d){
      vm.recent = d.data;

      console.log(d.data);
    });

    resources.getFeatured().get(function(d){
      vm.featured = d.data;
    });

  }

}());
