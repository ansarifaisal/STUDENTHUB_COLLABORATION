var EventModule = angular.module('EventModule', []);

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
            fetchAppliedEvents: fetchAppliedEvents,
            leaveEvent: leaveEvent,
            fetchCreatedEvents: fetchCreatedEvents

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
        function createEvent(event) {
            var deferred = $q.defer();
            $http.post(REST_API_URI + 'event/createEditEvent', event).then(function (response) {
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
        function editEvent(event) {

            var deferred = $q.defer();
            $http.post(REST_API_URI + 'event/createEditEvent', event).then(function (response) {
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

        //function to fetch applied event
        function fetchAppliedEvents(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + '/' + id + '/events').then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Fetching Events');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to delete applied event
        function leaveEvent(id, userId) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + 'event/leave/' + userId + '/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Leaving Event!');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        //function to fetch created Events
        function fetchCreatedEvents(id) {
            var deferred = $q.defer();
            $http.get(REST_API_URI + 'event/created/' + id).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error While Leaving Event!');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

    }]);