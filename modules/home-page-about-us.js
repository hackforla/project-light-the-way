/**
    Create a controller that has a content assigned HelloWorld!
        Input: 
            a) Know how to create controller
        
        Steps:
            1) Find out how to create controller
            2) Create the controller
**/

var aboutUs = angular.module('about-us', []);

aboutUs.controller('AboutUsController', function ($scope) {
  $scope.content = 'HelloWorld!';
});












/**

      this.content = null;

      $http.get('http://localhost5000/about-us').then(function(response) {
        this.content = response.content;
        
**/