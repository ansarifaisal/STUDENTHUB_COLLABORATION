var UserModule = angular.module('UserModule', []);

// change UserModule with your module name used within the application
UserModule.directive('fileModel', ['$parse', function ($parse) {
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

/*
<======================================================================>
|---------------------------User Factory-------------------------------|
<======================================================================>
 */

UserModule.factory('UserFactory', ['$http', '$q', function ($http, $q) {

    var REST_API_URI = "http://localhost:9005/webapp/";

    var userFactory = {

        loadProfile: loadProfile,
        getUser: getUser,
        editUser: editUser,
        uploadProfile: uploadProfile,
        addEditMoreDetails: addEditMoreDetails,
        addEditEducationDetails: addEditEducationDetails,
        checkOldPassword: checkOldPassword,
        changePassword: changePassword,
        reportUser: reportUser,
        blockUser: blockUser,
        addEditSocialLinks: addEditSocialLinks,
        deleteLink: deleteLink
    };

    return userFactory;

    //function to load Profile
    function loadProfile(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'user/profile/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Loading Profile');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to get user
    function getUser(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'admin/edit/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Getting User');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to upload profile
    function uploadProfile(file) {

        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', file);
        fd.append('id', user.id);
        console.log(fd);


        $http.post(REST_API_URI + 'uploadProfile', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Uploading Images');
                deferred.reject(errorResponse);
            }
            );
        return deferred.promise;
    }

    //function to edit user
    function editUser(user) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + 'register', user).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Editing User');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }

    //function to add edit more details
    function addEditMoreDetails(moreDetails) {

        var deferred = $q.defer();
        $http.post(REST_API_URI + 'user/addEditMoreDetails', moreDetails, {
            params: {
                'id': user.id
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Editing User');
                deferred.reject(errorResponse);
            }
            );
        return deferred.promise;
    }

    //function to add edit education details
    function addEditEducationDetails(educationDetails) {

        var deferred = $q.defer();
        $http.post(REST_API_URI + 'user/addEditEducationDetails', educationDetails, {
            params: {
                'id': user.id
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Editing User');
                deferred.reject(errorResponse);
            }
            );
        return deferred.promise;
    }

    //function to check old password
    function checkOldPassword(oldPassword) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + 'checkOldPassword', oldPassword, {
            params: {
                'id': user.id
            }
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }

    //function to change password
    function changePassword(password) {
        var deferred = $q.defer();
        $http.post(REST_API_URI + 'changePassword', password, {
            params: {
                'id': user.id
            }
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }

    //function to report user
    function reportUser(report) {

        var deferred = $q.defer();
        $http.post(REST_API_URI + "user/report", report).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log("Error Reporting User");
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }

    //function to block user
    function blockUser(action, id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'admin/' + action + '/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error ' + action + ' User');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;
    }


    //function to add edit social link
    function addEditSocialLinks(socialLink) {

        var deferred = $q.defer();
        $http.post(REST_API_URI + 'user/add/socialLinks', socialLink, {
            params: {
                'id': user.id
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Editing User');
                deferred.reject(errorResponse);
            }
            );
        return deferred.promise;
    }


    //function to delete social link
    function deleteLink(id) {

        var deferred = $q.defer();

        $http.get(REST_API_URI + 'social/delete/' + id).then(function (response) {
            deferred.resolve(response.data);
        },
            function (errorResponse) {
                console.log('Error Deleting Social Link');
                deferred.reject(errorResponse);
            }
        );
        return deferred.promise;

    }
}]);

/*
<======================================================================>
|---------------------------Friend Factory-----------------------------|
<======================================================================>
 */

UserModule.factory('FriendFactory', [
    '$http',
    '$q',
    function ($http, $q) {

        var REST_API_URI = "http://localhost:9005/webapp/";

        var friendFactory = {
            sendFriendRequest: sendFriendRequest
        };

        return friendFactory;


        //function to send friend request
        function sendFriendRequest(friendRequest) {
            var deferred = $q.defer();

            $http.post(REST_API_URI + 'user/request/friend', friendRequest).then(function (response) {
                deferred.resolve(response);
            },
                function (errorResponse) {
                    deferred.reject(errorResponse);
                }
            );
            return deferred.promise;
        }

    }]);