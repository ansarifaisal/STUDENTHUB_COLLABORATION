JobModule.controller('JobController', [
        'JobFactory', 
        '$location', 
        '$scope', 
        function(JobFactory, $location, $scope){

            settings();

        }]);