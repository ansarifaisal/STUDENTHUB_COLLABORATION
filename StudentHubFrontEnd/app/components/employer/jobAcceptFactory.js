var JobAcceptModule = angular.module('JobAcceptModule', []);

JobAcceptModule.factory('JobAcceptFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var jobAcceptFactory = {
            fetchAllJob: fetchAllJob,
            performAction: performAction
        }

        return jobAcceptFactory;

        function fetchAllJob() {
            var deferred = $q.defer();
            $http.get(REST_API_URI + 'job/appliedjobs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Fetching Applied Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function performAction(action, id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + 'employer/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Fetching Applied Job');
                    deferred.reject(errorResponse);
                }
            );
           return deferred.promise;
        }

    }
]);