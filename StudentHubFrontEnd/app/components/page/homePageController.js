
HomePageModule.controller('HomePageController', [
    'HomePageFactory',
    '$scope',
    '$location',
    '$timeout',
    function (HomePageFactory, $scope, $location, $timeout) {

        var me = this;

        me.content = [];

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchContent = function () {
            HomePageFactory.fetchContent().then(function (content) {
                me.content = content;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Content From The Database', 6000);
                }
            );
        }
    }
]);