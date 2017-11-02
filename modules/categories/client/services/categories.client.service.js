// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('categories')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource'];

  function CategoriesService($resource) {
    var service = {};
    service.categories = categories;
    service.category = category;
    return service;

    function categories(name){
      return $resource('api/c');
    }

    function category(name){
      return $resource('api/c/' + name);
    }
  }
}());
