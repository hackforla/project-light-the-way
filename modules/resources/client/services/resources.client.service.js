// Resources service used to communicate Resources REST endpoints
(function () {
  'use strict';

  angular
    .module('resources')
    .factory('ResourcesService', ResourcesService);

  ResourcesService.$inject = ['$resource'];

  function ResourcesService($resource) {
    var service = {};

    service.getResource = getResource;
    service.searchResource = searchResource;
    service.getNew = getNew;
    service.getFeatured = getFeatured;

    return service;

    function getResource(id){
      return $resource('api/r/'+id);
    }

    function searchResource(query){
      return $resource('api/r/search/'+query);
    }

    function getNew(){
      return $resource('api/r/new');
    }

    function getFeatured(){
      return $resource('api/r/feat');
    }

  }
}());
