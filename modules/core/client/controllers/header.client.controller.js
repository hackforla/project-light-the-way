'use strict';

angular.module('core').controller('HeaderController', HeaderController);
HeaderController.$inject = ['$window', '$state', 'Authentication', 'Menus'];
function HeaderController($window, $state, Authentication, Menus) {
  var vm = this;
  var nav;

  vm.nav = {};
  vm.nav.scroll = 0;
  vm.nav.dir = '';

  // Expose view variables
  vm.$state = $state;
  vm.authentication = Authentication;

  // Get the topbar menu
  vm.menu = Menus.getMenu('topbar');

  // Toggle the menu items
  vm.isCollapsed = false;
  vm.toggleCollapsibleMenu = function () {
    vm.isCollapsed = !vm.isCollapsed;
  };
  angular.element($window).addClass('.home');
  angular.element(document.querySelector('.home')).bind('scroll', function(){
    scroll();
  });

  function scroll(){
    var nav = document.querySelector('.home-nav');
    vm.nav.height = document.querySelector('.home-hero').offsetHeight;
    vm.nav.dir = (($window.scrollY - vm.nav.scroll) < 0) ? 'up' : 'down';
    if(vm.nav.dir === 'down'){
      if(vm.nav.scroll > vm.nav.height){
        showBG(nav);
        showNAV(nav);
      }else{
        hideBG(nav);
        showNAV(nav);
      }
    }else{
      if(vm.nav.scroll > vm.nav.height){
        hideNAV(nav);
        showNAV(nav);
      }else{
        hideBG(nav);
        showNAV(nav);
      }
    }
    vm.nav.scroll = $window.scrollY;
  }

  function showBG(e){
    angular.element(e).addClass('nav-bg');
  }

  function hideBG(e){
    angular.element(e).removeClass('nav-bg');
  }

  function showNAV(e){
    angular.element(e).removeClass('home-nav-hide');
  }
  function hideNAV(e){
    angular.element(e).addClass('home-nav-hide');
  }
}
