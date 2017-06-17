var AdminModule = angular.module('AdminModule', []);

/*
    <=============================================================>
    |----------------------Manage User Factory--------------------|
    <=============================================================>
*/
AdminModule.factory('ManageUserFactory', ['$http', '$q', function ($http, $q) {

    var REST_API_URI = "http://localhost:9005/webapp/";

    var manageUserModule = {

        fetchAllUsers: fetchAllUsers,
        editUser: editUser,
        getUser: getUser,
        validateUser: validateUser,
        validateAllUsers: validateAllUsers
    }

    return manageUserModule;

    //function to fetch all the users
    function fetchAllUsers() {

        var deferred = $q.defer();
        $http.get(REST_API_URI + 'admin/get').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Fetching User From The Database');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to edit the users
    function editUser(user) {

        var deferred = $q.defer();

        $http.post(REST_API_URI + 'register', user).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Updating User');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to fetch single user
    function getUser(id) {
        var deferred = $q.defer();

        $http.get(REST_API_URI + 'admin/edit/' + id).then(function (response) {
            deferred.resolve(response.data);
            //console.log(response.data);
        },
            function (errorResponse) {
                console.log('Error getting user');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to validateUser i.e disable, reject, approved
    function validateUser(id, action) {

        var deferred = $q.defer();
        $http.get(REST_API_URI + 'admin/' + action + '/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error While ' + action + " The User");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to validate all the users
    function validateAllUsers() {

        var deferred = $q.defer();
        $http.get(REST_API_URI + '/admin/validateallusers').then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error While Approving All The Users');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

}]);



/*
    <=============================================================>
    |----------------------Manage Blogs Factory--------------------|
    <=============================================================>
*/

AdminModule.factory('ManageBlogFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var manageBlogFactory = {

            fetchAllBlogs: fetchAllBlogs,
            editBlog: editBlog,
            getBlog: getBlog,
            validateBlog: validateBlog,
            validateAllBlogs: validateAllBlogs

        }

        return manageBlogFactory;


        function fetchAllBlogs() {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'blogs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error while fetching blogs');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function editBlog(blog) {
            var deferred = $q.defer();
            console.log(blog);
            $http.post(REST_API_URI + 'blog/createEditBlog', blog).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error updating the blog');
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getBlog(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'blog/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error while fetching blog');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateBlog(id, action) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/blog/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While ' + action + ' blog')
                }
            );
            return deferred.promise;
        }

        function validateAllBlogs() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/validateallblogs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error while approving the blogs');
                    deferred.reject;
                }
            );
            return deferred.promise;
        }
    }
]);

/*
    <==============================================================>
    |----------------------Manage Forum Factory--------------------|
    <==============================================================>
*/

AdminModule.factory('ManageForumFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var manageForumFactory = {

            getForum: getForum,
            fetchAllForums: fetchAllForums,
            validateForum: validateForum,
            validateAllForums: validateAllForums,
            editForum: editForum

        }

        return manageForumFactory;

        function getForum(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/forum/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Forum From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchAllForums() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/forums').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Forums From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateForum(id, action) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/forum/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While " + action + " The Forum");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateAllForums() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/admin/validateallforums').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Approving The Forums");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function editForum(forum) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + '/createEditForum', forum).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Editing The Forum");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);



/*
    <==============================================================>
    |----------------------Manage Job Factory--------------------|
    <==============================================================>
*/

AdminModule.factory('ManageJobFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var manageJobFactory = {

            getJob: getJob,
            fetchAllJobs: fetchAllJobs,
            validateJob: validateJob,
            validateAllJobs: validateAllJobs,
            editJob: editJob

        }

        return manageJobFactory;

        function getJob(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/job/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Job From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchAllJobs() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/jobs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Jobs From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateJob(id, action) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/job/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While " + action + " The Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateAllJobs() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + '/admin/validatealljobs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Approving The Jobs");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function editJob(job) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'job/createEditJob', job).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Editing The Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);



/*
    <==============================================================>
    |----------------------Manage Event Factory--------------------|
    <==============================================================>
*/

AdminModule.factory('ManageEventFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var manageEventFactory = {

            getEvent: getEvent,
            fetchAllEvents: fetchAllEvents,
            validateEvent: validateEvent,
            validateAllEvents: validateAllEvents,
            editEvent: editEvent

        }

        return manageEventFactory;

        function getEvent(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'event/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Event From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchAllEvents() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'events').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Events From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateEvent(id, action) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/event/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While " + action + " The Event");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateAllEvents() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/validateallevents').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Approving The Forums");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function editEvent(event) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'event/createEditEvent', event).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Editing The event");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);



/*
    <==============================================================>
    |----------------------Manage Topic Factory--------------------|
    <==============================================================>
*/

AdminModule.factory('ManageTopicFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var manageTopicFactory = {

            getTopic: getTopic,
            fetchAllTopics: fetchAllTopics,
            validateTopic: validateTopic,
            validateAllTopics: validateAllTopics,
            editTopic: editTopic

        }

        return manageTopicFactory;

        function getTopic(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'topic/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Topic From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchAllTopics() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'topics').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Topics From The Database");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateTopic(id, action) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/topic/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While " + action + " The Topic");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function validateAllTopics() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/validatealltopics').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Approving The Topics");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function editTopic(topic) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'topic/createEditTopic', topic).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Editing The Topic");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);