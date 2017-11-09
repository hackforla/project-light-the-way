(function () {
  'use strict';

  angular
    .module('checklists')
    .factory('ChecklistStorageService', ChecklistStorageService);

  ChecklistStorageService.$inject = ['$cookies','$cookieStore'];

  function ChecklistStorageService($cookies, cookies) {

    var service = {};
    service.get = get;
    service.add = add;
    service.del = del;

    var name = 'checklist';

    return service;

    function get(){
      var list = check();
      return list;
    }

    function add(v){
      var list = check();
      if(noDupe(list, v)){
        list.push(v);
        save(list);
      }else{
        console.log('dupes not allowed');
      }
    }

    function check(){
      var list = $cookies[name];
      if(list){
        if(list.indexOf(',') !== -1){
          return list.split(',');
        }else{
          return list.split();
        }
      }else{
        return [];
      }
    }


    function noDupe(list, v){
      if(list.indexOf(v) === -1){
        return true;
      }else{
        return false;
      }
    }

    function save(list){
      $cookies[name] = list.join(',');
    }

    function del(_id){
      var list = get();
      var index = list.indexOf(_id);

      if(index !== -1){
        list.splice(index,1);
        save(list);
      }else{
        console.log('id not found');
      }
    }


  }
}());
