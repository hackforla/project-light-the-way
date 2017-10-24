// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('categories')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource'];

  function CategoriesService($resource) {
    var service = {};
    service.getAll = getAll;
    return service;

    function getAll(name){
      return $resource('api/c');
    }
  }
}());
