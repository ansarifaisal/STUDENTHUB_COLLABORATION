
ChatModule.controller('ChatController', [
    'ChatFactory',
    'HomePageFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ChatFactory, HomePageFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 200);

        var me = this;

        me.chat = {}

        me.messages = [];
        me.message = {
            message: '',
            senderUserName: '',
            receiverUserName: ''
        };
        me.chatter = $routeParams.userName;
        me.sender = $rootScope.user.userName;

        me.isFriend = function () {
            ChatFactory.checkFriendByUser(me.chatter, me.sender).then(function (friend) {

                if (!friend) {
                    $rootScope.isFriend = 'false';
                } else {
                    $rootScope.isFriend = 'true';
                }

                //this code has bug;
                me.chat.senderUserName = $rootScope.user.userName;
                me.chat.receiverUserName = $routeParams.userName;
                $rootScope.sendChatNotification(me.chat);

                // HomePageFactory.chatNotification(me.sender, me.chatter).then(function (chat) {
                //     $rootScope.sendChatNotification(chat);
                // },
                //     function (errorResponse) {
                //         Materialize.toast("Error");
                //     }
                // );

            },
                function (errorResponse) {
                    Materialize.toast('Error Checking Friend', 6000);
                }
            );
        }

        me.addMessage = function () {
            me.message.senderUserName = me.sender;
            me.message.receiverUserName = me.chatter;

            ChatFactory.send(me.message);

            me.message.message = "";

        };

        ChatFactory.receive().then(null, null, function (message) {

            // var url = window.location.href;
            // var verifyUrl = "http://127.0.0.1:8887/#!/user/chat/" + message.senderUserName;

            me.messages.push(message);

        });
    }
]);