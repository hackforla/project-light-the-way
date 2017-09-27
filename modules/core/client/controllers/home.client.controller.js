(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['Authentication', 'ContentService'];

  function HomePageController(Authentication, content) {
    var vm = this;

    // This provides Authentication context.
    vm.authentication = Authentication;

    // For home view
    vm.home = {};
    vm.home.aboutus = content.getAboutUs();
    vm.home.title = 'Welcome to Project Light The Way';
    vm.home.slogan = 'Find the resources you need, and discover ones you did not know about';
    vm.home.logo = '/modules/core/client/img/brand/logo1.png';
  }

}());
