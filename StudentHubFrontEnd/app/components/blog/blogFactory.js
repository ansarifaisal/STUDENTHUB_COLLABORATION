var BlogModule = angular.module('BlogModule', []);


// change BlogModule with your module name used within the application
BlogModule.directive('fileModel', ['$parse', function ($parse) {
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


BlogModule.factory('BlogFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var blogFactory = {
            fetchAllBlogs: fetchAllBlogs,
            createEditBlog: createEditBlog,
            deleteBlog: deleteBlog,
            getBlog: getBlog,
            likeBlog: likeBlog,
            disLikeBlog: disLikeBlog,
            blogReport: blogReport,
            getComments: getComments,
            getComment: getComment,
            createEditBlogComment: createEditBlogComment,
            blogReportComment: blogReportComment,
            deleteBlogComment: deleteBlogComment
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
        function createEditBlog(blog, file) {
            var deferred = $q.defer();

            var fd = new FormData();
            fd.append('file', file);
            fd.append('blog', new Blob([JSON.stringify(blog)], { type: "application/json" }));

            $http.post(REST_API_URI + "blog/createEditBlog", fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error While Creating Or Editing The Blog");
                    deferred.reject(errorResponse);
                }
                );
            return deferred.promise;
        }

        //delete/disable blog
        function deleteBlog(action, id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "admin/blog/" + action + "/" + id).then(function (response) {
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

        //function to like blog
        function likeBlog(like) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/like", like).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Liking Blog");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to dislike blog

        function disLikeBlog(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/dislike/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Your Blogs");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to report blog
        function blogReport(report) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/report", report).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Blog");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to report blog Comment
        function blogReportComment(report) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/report/comment", report).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Blog");
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
        function createEditBlogComment(blogComment) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + "blog/createEditComment", blogComment).then(function (response) {
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
        function deleteBlogComment(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/comment/delete/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Deleting Comment");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function getComment(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + "blog/comments/edit/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Fetching Comment");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);