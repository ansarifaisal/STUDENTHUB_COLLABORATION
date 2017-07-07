
ChatModule.controller('ChatController', [
    'ChatFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ChatFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 200);

        var me = this;

        me.messages = [];
        me.message = "";
        me.chatter = $routeParams.userName;
        me.sender = $rootScope.user.userName;
        me.max = 140;

        me.isFriend = function () {
            ChatFactory.checkFriendByUser(me.chatter, me.sender).then(function (friend) {

                if (!friend) {
                    $rootScope.isFriend = 'false';
                } else {
                    $rootScope.isFriend = 'true';
                }

            },
                function (errorResponse) {
                    Materialize.toast('Error Checking Friend', 6000);
                }
            );
        }

        me.addMessage = function () {
            ChatFactory.send(me.sender + " - " + me.message);
            me.message = "";
        };

        ChatFactory.receive().then(null, null, function (message) {
            me.messages.push(message);

        });
    }
]);