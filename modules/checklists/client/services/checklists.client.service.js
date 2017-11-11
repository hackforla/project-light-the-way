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
    service.sendChecklist = sendChecklist;
    service.list = list;
    service.send = send;

    return service;

    function status(){
      return $resource('/api/checklists/mail');
    }

    function send(){
      return $resource('/api/checklists/send');
    }

    function sendChecklist(){
      return $resource('/api/checklists/mail');
    }

    function list(id){
      return $resource('/api/checklist/'+id);
    }

  }
}());
