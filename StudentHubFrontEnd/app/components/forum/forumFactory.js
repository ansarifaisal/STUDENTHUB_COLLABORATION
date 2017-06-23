var ForumModule = angular.module('ForumModule', []);

ForumModule.factory('ForumFactory', ['$http', '$q', function ($http, $q) {

    var REST_API_URI = "http://localhost:9005/webapp/";

    var forumFactory = {

        fetchAllForums: fetchAllForums,
        createForum: createForum,
        getForum: getForum,
        editForum: editForum,
        reportForum: reportForum,
        deleteForum: deleteForum,
        joinForum: joinForum,
        performActionOnRequest: performActionOnRequest,
        // fetchCreatedForums: fetchCreatedForums,
        // fetchJoinForums: fetchJoinForums,
        // fetchAllMembers: fetchAllMembers,
        // getTopic: getTopic,
        // getMemeber: getMember,
        // joinForum: joinForum,
        // createTopic: createTopic,
        // createForumComment: createForumComment,
        // createTopicComment: createTopicComment,
        // editForum: editForum,
        // editTopic: editTopic,
        // editForumComment: editForumComment,
        // editTopicComment: editTopicComment,
        // reportTopic: reportTopic,
        // reportForum: reportForum,
        // reportForumComment: reportForumComment,
        // reportTopicComment: reportTopicComment

    };

    return forumFactory;


    //function to fetch all forums
    function fetchAllForums() {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forums').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Forums');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to create forum
    function createForum(forum) {

        var deferred = $q.defer();

        $http.post(REST_API_URI + 'createEditForum', forum).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Forums');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to get forum
    function getForum(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forum/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to edit forum
    function editForum(forum) {
        var deferred = $q.defer();

        $http.post(REST_API_URI + 'createEditForum', forum).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Forums');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //funtion to report forum
    function reportForum(report) {

        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/report', report).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Reporting Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to delete forum
    function deleteForum(action, id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'admin/forum/' + action + '/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Deleting Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to join forum
    function joinForum(forumMember) {
        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/join/', forumMember).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Joining Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to perform action on request

    function performActionOnRequest(action, id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + '/forum/request/' + action + "/" + id ).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Canceling Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

}]);