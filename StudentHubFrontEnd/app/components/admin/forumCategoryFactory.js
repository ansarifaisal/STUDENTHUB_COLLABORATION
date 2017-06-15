//creating angular module named ForumCategory

var ForumCategoryModule = angular.module('ForumCategoryModule', []);

ForumCategoryModule.factory('ForumCategoryFactory', ['$http', '$q', function ($http, $q) {

    var FORUM_CATEGORY_URI = "http://localhost:9005/webapp/forumcategory/";

    forumCategoryFactory = {
        fetchAllForumCategory: fetchAllForumCategory,
        createForumCategory: createForumCategory,
        editForumCategory: editForumCategory,
        deleteForumCategory: deleteForumCategory,
        getForumCategory: getForumCategory
    }
    return forumCategoryFactory;

    function fetchAllForumCategory() {
        var deferred = $q.defer();

        $http.get(FORUM_CATEGORY_URI + 'all').then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function createForumCategory(forumCategory) {
        var deferred = $q.defer();

        $http.post(FORUM_CATEGORY_URI + 'create', forumCategory).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function editForumCategory(forumCategory) {
        var deferred = $q.defer();

        $http.post(FORUM_CATEGORY_URI + 'edit', forumCategory).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function deleteForumCategory(forumCategory) {
        var deferred = $q.defer();

        $http.post(FORUM_CATEGORY_URI + 'delete', forumCategory).then(function(response){
            deferred.resolve(response);
        },function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function getForumCategory(forumCategoryId){
        var deferred = $q.defer();

        $http.get(FORUM_CATEGORY_URI + 'get/'+forumCategoryId).then(function(response){
           deferred.resolve(response); 
        }, function(error){
            deferred.reject(error);
        });
        
        return deferred.promise;
    }

}]);