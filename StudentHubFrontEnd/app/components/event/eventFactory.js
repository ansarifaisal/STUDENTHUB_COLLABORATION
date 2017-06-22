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
            delAppliedEvent: delAppliedEvent
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
        function applyEvent() {
            
        }

        //function to report event
        function reportEvent() {

        }

        //function to create event
        function createEvent() {

        }

        //function to edit event
        function editEvent() {

        }

        //function to delete event
        function deleteEvent() {

        }

        //function to fetch applied event
        function fetchAppliedEvents() {

        }

        //function to delete applied event
        function delAppliedEvent() {

        }
    }]);