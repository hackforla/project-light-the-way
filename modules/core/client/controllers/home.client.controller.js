(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['$filter', '$location', '$window', 'CategoriesService', 'ResourcesService'];

  function HomePageController($filter, $location, $window, categories, resources) {
    var vm = this;
    var nav;

    vm.nav = {};
    vm.nav.scroll = 0;
    vm.nav.dir = '';

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
    
    angular.element($window).bind('scroll', function(){
      scroll();
    });

    function scroll(){
      nav = document.querySelector('.home-nav');
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

}());





// console.clear();
// window.addEventListener('scroll', scroll);
// document.querySelector('#here').addEventListener('click', update)
// var scroll = 0;
// var prev = 0;
// var max = 0;
// var scrolls = [];
//
//   scrolls.push(diff);
//   console.log('Number in data: ' + scrolls.length);
//
//   console.log(dir);
// }
//
// function doc(t, $){
//   document.querySelector($).innerHTML = t;
// }
//
// function unique(value, index, self) {
//     return self.indexOf(value) === index;
// }
//
// function update(){
//   var results = scrolls.filter(unique);
//
//   var log = {};
//
//   log.min = results[0];
//   log.max = results[results.length - 1];
//   log.numbers = scrolls;
//   // doc(results, '#here');
//   console.log(log);
//
//
//   var blob = new Blob([log.numbers], {type: "text/plain;charset=utf-8"});
//   saveAs(blob, "results.csv");
// }
