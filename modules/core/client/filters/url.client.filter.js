(function () {
  'use strict';

  angular
    .module('core')
    .filter('url', url);

  url.$inject = [];

  function url() {
    function encode(i){
      return i.split(' ').join('+');
    }
    return encode;
  }
})();
