var EventModule = angular.module('EventModule', []);

// change EventModule with your module name used within the application
EventModule.directive('fileModel', ['$parse', function ($parse) {
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

EventModule.factory('EventFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var eventFactory = {

            fetchAllEvents: fetchAllEvents,
            getEvent: getEvent,
            applyEvent: applyEvent,
            reportEvent: reportEvent,
            createEvent: createEvent,
            editEvent: editEvent,
            deleteEvent: deleteEvent,
            leaveEvent: leaveEvent,
        };

        return eventFactory;

        //function to fetch all events
        function fetchAllEvents() {

            var deferred = $q.defer();
            $http.get(REST_API_URI + 'events').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Events');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to get events
        function getEvent(id) {

            var deferred = $q.defer();
            $http.get(REST_API_URI + 'event/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Events');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to apply Event
        function applyEvent(joinEvent) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + 'event/join', joinEvent).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    // console.log(errorResponse);
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to report event
        function reportEvent(report) {

            var deferred = $q.defer();
            $http.post(REST_API_URI + 'event/report', report).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Reporting Events');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to create event
        function createEvent(event, file) {
            var deferred = $q.defer();
            
            var fd = new FormData();
            fd.append('file', file);
            fd.append('event', new Blob([JSON.stringify(event)], { type: "application/json" }));

            $http.post(REST_API_URI + 'event/createEditEvent', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Creating Events');
                    deferred.reject(errorResponse);
                }
                );
            return deferred.promise;
        }

        //function to edit event
        function editEvent(event, file) {

            var deferred = $q.defer();

            var fd = new FormData();
            fd.append('file', file);
            fd.append('event', new Blob([JSON.stringify(event)], { type: "application/json" }));

            $http.post(REST_API_URI + 'event/createEditEvent', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Editing Events');
                    deferred.reject(errorResponse);
                }
                );

            return deferred.promise;

        }

        //function to delete event
        function deleteEvent(action, id) {

            var deferred = $q.defer();
            $http.get(REST_API_URI + 'admin/event/' + action + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Delete Event!');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;

        }

        //function to delete applied event
        function leaveEvent(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + 'event/leave/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Leaving Event!');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }


    }
]);