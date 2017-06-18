var BlogModule = angular.module('BlogModule', []);

BlogModule.factory('BlogFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var blogFactory = {
            fetchAllBlogs: fetchAllBlogs,
            createEditBlog: createEditBlog,
            getBlog: getBlog,
            getMyBlogs: getMyBlogs,
            peformBlogAction: performBlogAction,
            getComments: getComments,
            createEditBlogComment: createEditBlogComment,
            performBlogCommentAction: performBlogCommentAction
        };

        return blogFactory;

        //function to Fetch all blogs
        function fetchAllBlogs() {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'blogs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Blogs');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to edit blog
        function createEditBlog(blog) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/createEditBlog", blog).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Creating Or Editing The Blog");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to getBlog
        function getBlog(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Blog");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //Action perform like report and like
        function performBlogAction(id, action) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/" + action + "/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Blog");
                    deferred.reject(errorResponse);
                }
            );
           return  deferred.promise;
        }

        //get all my blog
        function getMyBlogs(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/myblog/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Your Blogs");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //get all comments
        function getComments(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/" + id + "/comments").then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Comment");
                    deferred.reject(errorResponse);
                }
            );
          return deferred.promise;
        }

        //create or edit comment
        function createEditBlogComment(id, blogComment) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/" + id + "/createeditcomment", blogComment).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Posting Comment");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //Perform Action report and like
        function performBlogCommentAction(blogId, action, id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/" + blogId + "/comment/" + action + "/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Performing Action");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

    }
]);