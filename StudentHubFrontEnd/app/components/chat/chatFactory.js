var ChatModule = angular.module('ChatModule', []);

ChatModule.factory('ChatFactory', [
    '$http',
    '$q',
    '$timeout',
    function ($http, $q, $timeout) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var service = {};

        listener = $q.defer();

        socket = {
            client: null,
            stomp: null
        };

        messageIds = [];

        service.RECONNECT_TIMEOUT = 30000;
        service.SOCKET_URL = "http://localhost:9005/webapp/chat";
        service.CHAT_TOPIC = "/topic/message";
        service.CHAT_BROKER = "/app/chat";

        service.receive = function () {
            //this function returns the deferred object
            return listener.promise;
        };

        //this function sends the message as a json object with newly generate idF
        service.send = function (message) {
            var id = Math.floor(Math.random() * 1000000);
            socket.stomp.send(service.CHAT_BROKER, {
                priority: 9
            }, JSON.stringify({
                message: message,
                id: id
            }));
            messageIds.push(id);
        };

        //when the connection lost calling initialize function to reconnect after 30 seconds;
        var reconnect = function () {
            $timeout(function () {
                initialize();
            }, this.RECONNECT_TIMEOUT);
        };

        //this function translate the websocket body to the model required by the controller
        var getMessage = function (data) {
            var message = JSON.parse(data), out = {};
            out.message = message.message;
            out.time = new Date(message.time);
            // if (_.contains(messageIds, message.id)) {
            //     out.self = true;
            //     messageIds = _.remove(messageIds, message.id);
            // }
            return out;
        };

        //when the client is connection to websocket server then this function is called
        //it will send the data to the deffered which will be used by the controller
        var startListener = function () {
            socket.stomp.subscribe(service.CHAT_TOPIC, function (data) {
                //calling the get message function
                listener.notify(getMessage(data.body));
            });
        };

        var initialize = function () {
            socket.client = new SockJS(service.SOCKET_URL);
            socket.stomp = Stomp.over(socket.client);
            socket.stomp.connect({}, startListener);
            socket.stomp.onclose = reconnect;
        };

        //Calling intialize function
        //this function will set up the SockJS Websocket Client And Use It For The Stomp.js Websocket Client. 
        initialize();

    service.checkFriendByUser = function (initiater, friend) {
            var deferred = $q.defer();

            $http.get(REST_API_URI + 'user/checkFrndByUser/' + initiater + '/' + friend).then(function (response) {
                deferred.resolve(response.data);
            },
                function (errorResponse) {
                    console.log('Error Checking Friend');
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

        return service;
    }
]);