var ReportModule = angular.module('ReportModule', []);

ReportModule.factory('BlogReportFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var blogReportFactory = {
            fetchReportsByCategory: fetchReportsByCategory,
            getReport: getReport,
            handleReport: handleReport,
            deleteReport: deleteReport,
            fetchHandleReports: fetchHandleReports
        }
        return blogReportFactory;

        //function to fetch the reports
        function fetchReportsByCategory(category) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/report/category/' + category).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to fetch the report
        function getReport(id) {

            var deferred = $q.defer();
            $http.get(REST_API_URI + 'admin/report/id/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to handle report
        function handleReport(handle) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'admin/report/handle', handle).then(function (response) {

                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Handling The Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to delete report
        function deleteReport(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/report/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Deleting Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchHandleReports(category) {
            
            var deferred = $q.defer();
            
            $http.get(REST_API_URI + 'admin/handle/category/' + category).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);

ReportModule.factory('BlogCommentReportFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var blogCommentReportFactory = {
            fetchReportsByCategory: fetchReportsByCategory,
            getReport: getReport,
            handleReport: handleReport,
            deleteReport: deleteReport,
            fetchHandleReports: fetchHandleReports
        }
        return blogCommentReportFactory;

        //function to fetch the reports
        function fetchReportsByCategory(category) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/report/category/' + category).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to fetch the report
        function getReport(id) {

            var deferred = $q.defer();
            $http.get(REST_API_URI + 'admin/report/id/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to handle report
        function handleReport(handle) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'admin/report/handle', handle).then(function (response) {

                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Handling The Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to delete report
        function deleteReport(id) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'admin/report/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Deleting Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function fetchHandleReports(category) {
            
            var deferred = $q.defer();
            
            $http.get(REST_API_URI + 'admin/handle/category/' + category).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Reports');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }
    }
]);