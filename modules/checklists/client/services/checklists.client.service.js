// Checklists service used to communicate Checklists REST endpoints
(function () {
  'use strict';

  angular
    .module('checklists')
    .factory('ChecklistsService', ChecklistsService);

  ChecklistsService.$inject = ['$resource'];

  function ChecklistsService($resource) {
    var service = {};
    service.status = status;
    service.sendMail = sendMail;

    return service;

    function status(){
      return $resource('/api/checklists/mail');
    }

    function sendMail(){
      return $resource('/api/checklists/mail');
    }
  }
}());
