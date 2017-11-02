// Resources service used to communicate Resources REST endpoints
(function () {
  'use strict';

  angular
    .module('resources')
    .factory('ResourcesService', ResourcesService);

  ResourcesService.$inject = ['$resource'];

  function ResourcesService($resource) {

    var service = {
      getResource:getResource,
      searchResource:searchResource,
      getNew:getNew,
      getFeatured:getFeatured,
      resources:resources
    };

    return service;

    function getResource(id){
      return $resource('api/r/'+id);
    }

    function searchResource(query){
      return $resource('api/r/search/'+query);
    }

    function getNew(){
      return $resource('api/resources/new');
    }

    function getFeatured(){
      return $resource('api/resources/feat');
    }

    function resources(){
      return $resource('api/r');
    }

  }
}());
