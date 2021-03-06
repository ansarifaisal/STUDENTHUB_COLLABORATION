var ForumModule = angular.module('ForumModule', []);

// change EventModule with your module name used within the application
ForumModule.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

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
        topicLike: topicLike,
        disLikeTopic: disLikeTopic,
        createTopicComment: createTopicComment,
        fetchTopicComments: fetchTopicComments,
        getTopicComment: getTopicComment,
        reportTopicComment: reportTopicComment,
        editTopicComment: editTopicComment,
        deleteTopicComment: deleteTopicComment

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
    function createForum(forum, file) {

        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', file);
        fd.append('forum', new Blob([JSON.stringify(forum)], { type: "application/json" }));

        $http.post(REST_API_URI + 'createEditForum', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
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
    function editForum(forum, file) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', file);
        fd.append('forum', new Blob([JSON.stringify(forum)], { type: "application/json" }));

        $http.post(REST_API_URI + 'createEditForum', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
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
                console.log('Error Reporting Topic');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to like topic
    function topicLike(like) {

        var deferred = $q.defer();
        $http.post(REST_API_URI + "forum/topic/like", like).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Liking Topic");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to dislike topic
    function disLikeTopic(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + "forum/topic/dislike/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Disliking Topic");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to create topic comment
    function createTopicComment(comment) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + "forum/topic/comment/createEditComment", comment).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Liking Topic");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //funciton to get topic Comments
    function fetchTopicComments(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + "forum/topic/comments/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Topic Comments");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to get topic comment
    function getTopicComment(id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + "forum/topic/comment/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Fetching Topic Comment");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to report topic comment
    function reportTopicComment(report) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + "forum/topic/comment/report", report).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Liking Topic");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to edit topic comment
    function editTopicComment(topicComment) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + "forum/topic/comment/createEditComment", topicComment).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Liking Topic");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    function deleteTopicComment(id) {

        var deferred = $q.defer();
        $http.get(REST_API_URI + "forum/topic/comment/delete/" + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Deleting Topic Comment");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

}]);