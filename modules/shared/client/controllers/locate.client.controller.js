(function () {
  'use strict';

  angular
    .module('shared')
    .controller('LocateController', LocateController);

  LocateController.$inject = ['$location', '$filter', 'LocateService'];

  function LocateController($location, $filter, location) {
    var vm = this;
    vm.fn = {};
    vm.fn.locate = locate;

    vm.u = {};

    function locate(){
      if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(pos){
          location.latlng(pos.coords.latitude, pos.coords.longitude).then(function(d){
            vm.location = d.city;
          });
          console.log('Location found');
        });
      }else{
        console.log('Unable to locate');
      }
    }
  }
}());
