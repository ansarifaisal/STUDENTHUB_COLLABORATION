var UserModule = angular.module('UserModule', []);

UserModule.factory('UserFactory', ['$http', '$q', function ($http, $q) {

    var REST_API_URI = "http://localhost:9005/webapp/";

    var userFactory = {

        loadProfile: loadProfile
    };

    return userFactory;

    //function to load Profile
    function loadProfile(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'user/profile/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Loading Profile');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }


}]);