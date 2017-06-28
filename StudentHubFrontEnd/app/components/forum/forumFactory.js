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
        get12Members: get12Members,
        approveAllRequest: approveAllRequest,
        performActionOnForum: performActionOnForum,
        createForumComment: createForumComment,
        getForumComments: getForumComments,
        getForumComment: getForumComment,
        reportForumComment: reportForumComment,
        deleteForumComment: deleteForumComment,
        fetchTopics: fetchTopics,
        createEditTopic: createEditTopic,
        performActionOnTopic: performActionOnTopic,
        approveAllTopics: approveAllTopics,
        getTopic: getTopic,
        topicReport: topicReport,
        // fetchCreatedForums: fetchCreatedForums,
        // fetchJoinForums: fetchJoinForums,
        // fetchAllMembers: fetchAllMembers,
        // getTopic: getTopic,
        // getMemeber: getMember,
        // joinForum: joinForum,
        // createTopic: createTopic,
        // createForumComment: createForumComment,
        // createTopicComment: createTopicComment,
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

        $http.post(REST_API_URI + 'forum/join', forumMember).then(function (response) {
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

        $http.get(REST_API_URI + 'forum/request/' + action + "/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Canceling Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to get 12 members
    function get12Members(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + '/forum/twelveMembers/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Members');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }


    //function to get 12 members
    function approveAllRequest(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forum/approveAll/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Members');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    function performActionOnForum(action, id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'admin/forum/' + action + "/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Canceling Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to create forum comment
    function createForumComment(forumComment) {
        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/comment/createEditForumComment', forumComment).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Joining Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to get forum comment
    function getForumComment(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forum/comment/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Comments');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to get forumComments
    function getForumComments(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forum/comments/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Comments');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to report forumComment

    function reportForumComment(report) {

        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/comment/report', report).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Comments');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to delete forum comments
    function deleteForumComment(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'forum/comment/delete/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Comments');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to get all topics
    function fetchTopics(id) {
        var deferred = $q.defer();
        $http.get(REST_API_URI + 'forum/' + id + '/topics').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Topic');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function create edit topic
    function createEditTopic(topic) {
        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/topic/createEditTopic', topic).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Creating Topic');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //funtion to perform action on topic
    function performActionOnTopic(action, id) {

        var deferred = $q.defer();
        $http.get(REST_API_URI + 'admin/topic/' + action + '/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error While ' + action + ' Topic');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to approve all blogs
    function approveAllTopics() {

        var deferred = $q.defer();
        $http.get(REST_API_URI + 'admin/validatealltopics').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error While Approving Topics');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to get topic
    function getTopic(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'topic/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Forum');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to report topic
    function topicReport(report) {
        var deferred = $q.defer();

        $http.post(REST_API_URI + 'forum/topic/report', report).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching Topic');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

}]);