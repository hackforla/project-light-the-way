var aboutUs = angular.module('about-us', []);

aboutUs.controller('AboutUsController', function ($scope, $http) {
  $http.get('about-us/content').then(function(response) {
    $scope.content = response.data.content;    
  })
});