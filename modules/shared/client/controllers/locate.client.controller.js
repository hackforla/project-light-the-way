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

    function locate(){
      if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(pos){
          location.latlng(pos.coords.latitude, pos.coords.longitude).then(function(d){
            console.log(d);
          });
          console.log('Location found');
        });
      }else{
        console.log('Unable to locate');
      }
    }
  }
}());
