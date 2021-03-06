var HomePageModule = angular.module('HomePageModule', []);


HomePageModule.factory('HomePageFactory', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

    var REST_API_URI = "http://localhost:9005/webapp/";

    var homePageFactory = {
        fetchContent: fetchContent,
        notification: notification,
        fetchOnlineFriends: fetchOnlineFriends,
        chatNotification: chatNotification
    }

    return homePageFactory;

    function fetchContent() {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'content').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Content From The Database");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    function notification(id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'notification/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Notification");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }


    function fetchOnlineFriends(id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'user/friends/online/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Online Friends");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }


    function chatNotification(chatter, sender) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'test/isChatting/' + chatter + '/' + sender).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Online Friends");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

}]);