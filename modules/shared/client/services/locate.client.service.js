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
          var place = {};
          d.data.results.forEach(function(p){
            if(p.types[0] === 'postal_code'){
              var area = p.address_components;
              place.zip = area[0].short_name;
              place.city = area[2].short_name;
              place.state = area[4].short_name;
            }
          });
          return place;
        },
        function(d){
          console.log(d.data);
          return d;
        }
      );
    }

  }
}());
