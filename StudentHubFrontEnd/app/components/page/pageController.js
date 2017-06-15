var page = angular.module('userModule', []);

page.controller('homeController',['$scope', function($scope){
    $scope.message = 'This is home page';
    
    settings();

}]);