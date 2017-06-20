
HomePageModule.controller('HomePageController', [
    'HomePageFactory',
    'BlogFactory',
    '$scope',
    '$location',
    '$timeout',
    '$route',
    function (HomePageFactory, BlogFactory, $scope, $location, $timeout, $route) {

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
        //function to delete blog
        me.deleteBlog = function (action, id) {
            BlogFactory.deleteBlog(action, id).then(function () {
                $route.reload();
                Materialize.toast('Blog Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Blogs', 6000);
                }
            );
        }
    }
]);