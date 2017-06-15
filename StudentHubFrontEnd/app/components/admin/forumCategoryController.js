ForumCategoryModule.controller('ForumCategoryController', [
    'ForumCategoryFactory',
    '$location',
    '$scope',
    function (ForumCategoryFactory, $location, $scope) {

        var me = this;
        me.forumCategories = [];
        me.forumCategory = { categoryId: undefined, name: '', description: '' };

        me.fetchAllForumCategory = function () {
            ForumCategoryFactory.fetchAllForumCategory().then(function (response) {
                me.forumCategories = response;

            }, function (error) {
                $scope.message = "Error While Fetching The Forum Categories";
            });
        }

        me.getForumCategory = function (id) {
            ForumCategoryFactory.getForumCategory(id).then(function (response) {
                me.forumCategory = response;
            }, function (error) {
                $scope.message = "Error While Fetching Forum Category";
            })
        }

        me.createForumCategory = function () {
            ForumCategoryFactory.createForumCategory(me.forumCategory).then(function (response) {
                console.log(me.forumCategory);
                $scope.message = "Category Created Successfully!";
                Materialize.toast('Registration successful!', 2000);
            }, function (error) {
                $scope.message = "Error While Creating Forum Category";
            });
        }

        me.editForumCategory = function (id) {
            me.forumCategory = me.getForumCategory(id);
            ForumCategoryFactory.editForumCategory(me.forumCategory).then(function (reponse) {
                me.forumCategory = response;
                $scope.message = "Forum Category Successfully Updated";
            }, function (error) {
                $scope.message = "Failed To Edit The Category";
            });
        }

    }]);