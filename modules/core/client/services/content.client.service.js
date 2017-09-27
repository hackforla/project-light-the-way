(function () {
  'use strict';

  angular
    .module('core')
    .factory('ContentService', ContentService);

  ContentService.$inject = ['$resource'];

  function ContentService($resource) {

    var content = {};
    content.getAboutUs = getAboutUs;
    return content;
    function getAboutUs(){
      return 'This is the about us content.';
    }

    // Future API Access

    // return $resource('api/content/:contentName', {
    //   resourceId: '@_id'
    // }, {
    //   update: {
    //     method: 'PUT'
    //   }
    // });


  }
}());
