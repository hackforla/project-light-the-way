// Vets service used to communicate Vets REST endpoints
(function () {
  'use strict';

  angular
    .module('shared')
    .factory('LocateService', LocateService);

  LocateService.$inject = ['$http'];

  function LocateService($http) {
    var service = {};
    service.latlng = latlng;
    var key = 'AIzaSyBRdO1toSo7IYxCT2qaFSfs47rdhV4M9Ko';
    var api = 'https://maps.googleapis.com/maps/api/geocode/json';

    return service;

    function latlng(lat,lng){
      return $http.get(api+'?latlng='+lat+','+lng+'&key='+key).then(
        function(d){
          console.log(d);
          return d;
        },
        function(d){
          console.log(d);
          return d;
        }
      );
    }

  }
}());
