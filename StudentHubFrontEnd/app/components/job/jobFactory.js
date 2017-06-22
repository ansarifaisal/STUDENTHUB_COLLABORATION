var JobModule = angular.module('JobModule', []);

JobModule.factory('JobFactory', [
    '$q',
    '$http',
    function ($q, $http) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var jobFactory = {

            fetchAllJobs: fetchAllJobs,
            fetchAppliedJobs: fetchAppliedJobs,
            getJob: getJob,
            createEditJob: createEditJob,
            applyJob: applyJob,
            disableJob: disableJob,
            reportJob: reportJob,
            delAppliedJob: delAppliedJob,
            fetchCreateJobList: fetchCreateJobList,
            createJob: createJob,
            deleteJob: deleteJob,
            editJob: editJob

        };

        return jobFactory;

        //function to fetch all jobs
        function fetchAllJobs() {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'jobs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Jobs');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to fetch all Applied jobs
        function fetchAppliedJobs(id) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'job/' + id + '/appliedJobs').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Jobs');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to get job
        function getJob(id) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'job/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to create job
        function createEditJob(job) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + '/job/createEditJob', job).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        function applyJob(job) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'job/apply', job).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to disable job
        function disableJob(id) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + '/job/disable/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to report job
        function reportJob(report) {

            var deferred = $q.defer();
            $http.post(REST_API_URI + "job/report", report).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to delete applied Request job
        function delAppliedJob(id) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'job/delAppliedJob/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to fetch created jobs
        function fetchCreateJobList(id) {

            var deferred = $q.defer();

            $http.get(REST_API_URI + 'job/jobCreatedList/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Job');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to create job
        function createJob(job) {

            var deferred = $q.defer();
            $http.post(REST_API_URI + "job/createEditJob", job).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to delete job
        function deleteJob(action, id) {

            var deferred = $q.defer();
            $http.get(REST_API_URI + "admin/job/" + action + "/" + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Deleting Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to edit job
        function editJob(job) {

            var deferred = $q.defer();
            $http.post(REST_API_URI + "job/createEditJob", job).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log("Error Reporting Job");
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

    }]);