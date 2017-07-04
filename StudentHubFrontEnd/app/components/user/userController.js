UserModule.controller('UserController', [
    'UserFactory',
    'AuthenticationFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (UserFactory, AuthenticationFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 200);

        var me = this;

        me.data = [];

        me.reportUser = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        //function to load profile
        me.loadProfile = function () {
            var userId = $routeParams.id;
            UserFactory.loadProfile(userId).then(function (content) {
                me.data = content;
                console.log(me.data.createdForums);
                me.fetchCreatedForums(me.data.createdForums);
                me.fetchCreatedJobs(me.data.createdJobs);
                me.fetchCreatedEvents(me.data.createdEvents);
                me.fetchCreatedBlogs(me.data.createdBlogs);
            },
                function (errorResposne) {
                    Materialize.toast('Error Loading Profile', 6000);
                }
            );
        }

        //funtion to fetch created forums
        me.fetchCreatedForums = function (forums) {

            var sortingOrder_ONE = 'id'; //default sort

            $scope.sortingOrder_ONE = sortingOrder_ONE;
            $scope.pageSizes_ONE = [5, 10, 25, 50];
            $scope.reverse_ONE = true;
            $scope.filteredItems_ONE = [];
            $scope.groupedItems_ONE = [];
            $scope.itemsPerPage_ONE = 10;
            $scope.pagedItems_ONE = [];
            $scope.currentPage_ONE = 0;
            $scope.items_ONE = forums;

            var searchMatch_ONE = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_ONE = function () {
                $scope.filteredItems_ONE = $filter('filter')($scope.items_ONE, function (item) {
                    for (var attr in item) {
                        if (searchMatch_ONE(item['forumName'], $scope.query_ONE))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_ONE !== '') {
                    $scope.filteredItems_ONE = $filter('orderBy')($scope.filteredItems_ONE, $scope.sortingOrder_ONE, $scope.reverse_ONE);
                }

                $scope.currentPage_ONE = 0;
                // now group by pages
                $scope.groupToPages_ONE();
            };

            // show items per page
            $scope.perPage_ONE = function () {
                $scope.groupToPages_ONE();
            };

            // calculate page in place
            $scope.groupToPages_ONE = function () {
                $scope.pagedItems_ONE = [];

                for (var i = 0; i < $scope.filteredItems_ONE.length; i++) {
                    if (i % $scope.itemsPerPage_ONE === 0) {
                        $scope.pagedItems_ONE[Math.floor(i / $scope.itemsPerPage_ONE)] = [$scope.filteredItems_ONE[i]];
                    } else {
                        $scope.pagedItems_ONE[Math.floor(i / $scope.itemsPerPage_ONE)].push($scope.filteredItems_ONE[i]);
                    }
                }
            };

            $scope.prevPage_ONE = function () {
                if ($scope.currentPage_ONE > 0) {
                    $scope.currentPage_ONE--;
                }
            };

            $scope.nextPage_ONE = function () {
                if ($scope.currentPage_ONE < $scope.pagedItems_ONE.length - 1) {
                    $scope.currentPage_ONE++;
                }
            };

            $scope.setPage_ONE = function () {
                $scope.currentPage_ONE = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_ONE();


            // change sorting order
            $scope.sort_by_ONE = function (newSortingOrder) {
                if ($scope.sortingOrder_ONE == newSortingOrder)
                    $scope.reverse_ONE = !$scope.reverse_ONE;

                $scope.sortingOrder_ONE = newSortingOrder;
            };

        }

        // function to detch created jobs
        me.fetchCreatedJobs = function (jobs) {

            var sortingOrder_TWO = 'id'; //default sort

            $scope.sortingOrder_TWO = sortingOrder_TWO;
            $scope.pageSizes_TWO = [5, 10, 25, 50];
            $scope.reverse_TWO = true;
            $scope.filteredItems_TWO = [];
            $scope.groupedItems_TWO = [];
            $scope.itemsPerPage_TWO = 10;
            $scope.pagedItems_TWO = [];
            $scope.currentPage_TWO = 0;
            $scope.items_TWO = jobs;

            var searchMatch_TWO = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_TWO = function () {
                $scope.filteredItems_TWO = $filter('filter')($scope.items_TWO, function (item) {
                    for (var attr in item) {
                        if (searchMatch_TWO(item['title'], $scope.query_TWO))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_TWO !== '') {
                    $scope.filteredItems_TWO = $filter('orderBy')($scope.filteredItems_TWO, $scope.sortingOrder_TWO, $scope.reverse_TWO);
                }

                $scope.currentPage_TWO = 0;
                // now group by pages
                $scope.groupToPages_TWO();
            };

            // show items per page
            $scope.perPage_TWO = function () {
                $scope.groupToPages_TWO();
            };

            // calculate page in place
            $scope.groupToPages_TWO = function () {
                $scope.pagedItems_TWO = [];

                for (var i = 0; i < $scope.filteredItems_TWO.length; i++) {
                    if (i % $scope.itemsPerPage_TWO === 0) {
                        $scope.pagedItems_TWO[Math.floor(i / $scope.itemsPerPage_TWO)] = [$scope.filteredItems_TWO[i]];
                    } else {
                        $scope.pagedItems_TWO[Math.floor(i / $scope.itemsPerPage_TWO)].push($scope.filteredItems_TWO[i]);
                    }
                }
            };

            $scope.prevPage_TWO = function () {
                if ($scope.currentPage_TWO > 0) {
                    $scope.currentPage_TWO--;
                }
            };

            $scope.nextPage_TWO = function () {
                if ($scope.currentPage_TWO < $scope.pagedItems_TWO.length - 1) {
                    $scope.currentPage_TWO++;
                }
            };

            $scope.setPage_TWO = function () {
                $scope.currentPage_TWO = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_TWO();


            // change sorting order
            $scope.sort_by_TWO = function (newSortingOrder) {
                if ($scope.sortingOrder_TWO == newSortingOrder)
                    $scope.reverse_TWO = !$scope.reverse_TWO;

                $scope.sortingOrder_TWO = newSortingOrder;
            };

        }

        // function to fetch created events
        me.fetchCreatedEvents = function (events) {
            var sortingOrder_THREE = 'id'; //default sort

            $scope.sortingOrder_THREE = sortingOrder_THREE;
            $scope.pageSizes_THREE = [5, 10, 25, 50];
            $scope.reverse_THREE = true;
            $scope.filteredItems_THREE = [];
            $scope.groupedItems_THREE = [];
            $scope.itemsPerPage_THREE = 10;
            $scope.pagedItems_THREE = [];
            $scope.currentPage_THREE = 0;
            $scope.items_THREE = events;

            var searchMatch_THREE = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_THREE = function () {
                $scope.filteredItems_THREE = $filter('filter')($scope.items_THREE, function (item) {
                    for (var attr in item) {
                        if (searchMatch_THREE(item['eventTitle'], $scope.query_THREE))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_THREE !== '') {
                    $scope.filteredItems_THREE = $filter('orderBy')($scope.filteredItems_THREE, $scope.sortingOrder_THREE, $scope.reverse_THREE);
                }

                $scope.currentPage_THREE = 0;
                // now group by pages
                $scope.groupToPages_THREE();
            };

            // show items per page
            $scope.perPage_THREE = function () {
                $scope.groupToPages_THREE();
            };

            // calculate page in place
            $scope.groupToPages_THREE = function () {
                $scope.pagedItems_THREE = [];

                for (var i = 0; i < $scope.filteredItems_THREE.length; i++) {
                    if (i % $scope.itemsPerPage_THREE === 0) {
                        $scope.pagedItems_THREE[Math.floor(i / $scope.itemsPerPage_THREE)] = [$scope.filteredItems_THREE[i]];
                    } else {
                        $scope.pagedItems_THREE[Math.floor(i / $scope.itemsPerPage_THREE)].push($scope.filteredItems_THREE[i]);
                    }
                }
            };

            $scope.prevPage_THREE = function () {
                if ($scope.currentPage_THREE > 0) {
                    $scope.currentPage_THREE--;
                }
            };

            $scope.nextPage_THREE = function () {
                if ($scope.currentPage_THREE < $scope.pagedItems_THREE.length - 1) {
                    $scope.currentPage_THREE++;
                }
            };

            $scope.setPage_THREE = function () {
                $scope.currentPage_THREE = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_THREE();


            // change sorting order
            $scope.sort_by_THREE = function (newSortingOrder) {
                if ($scope.sortingOrder_THREE == newSortingOrder)
                    $scope.reverse_THREE = !$scope.reverse_THREE;

                $scope.sortingOrder_THREE = newSortingOrder;
            };
        }

        //function to fetch created blogs
        me.fetchCreatedBlogs = function (blogs) {

            var sortingOrder_FOUR = 'id'; //default sort

            $scope.sortingOrder_FOUR = sortingOrder_FOUR;
            $scope.pageSizes_FOUR = [5, 10, 25, 50];
            $scope.reverse_FOUR = true;
            $scope.filteredItems_FOUR = [];
            $scope.groupedItems_FOUR = [];
            $scope.itemsPerPage_FOUR = 10;
            $scope.pagedItems_FOUR = [];
            $scope.currentPage_FOUR = 0;
            $scope.items_FOUR = blogs;

            var searchMatch_FOUR = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_FOUR = function () {
                $scope.filteredItems_FOUR = $filter('filter')($scope.items_FOUR, function (item) {
                    for (var attr in item) {
                        if (searchMatch_FOUR(item['title'], $scope.query_FOUR))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_FOUR !== '') {
                    $scope.filteredItems_FOUR = $filter('orderBy')($scope.filteredItems_FOUR, $scope.sortingOrder_FOUR, $scope.reverse_FOUR);
                }

                $scope.currentPage_FOUR = 0;
                // now group by pages
                $scope.groupToPages_FOUR();
            };

            // show items per page
            $scope.perPage_FOUR = function () {
                $scope.groupToPages_FOUR();
            };

            // calculate page in place
            $scope.groupToPages_FOUR = function () {
                $scope.pagedItems_FOUR = [];

                for (var i = 0; i < $scope.filteredItems_FOUR.length; i++) {
                    if (i % $scope.itemsPerPage_FOUR === 0) {
                        $scope.pagedItems_FOUR[Math.floor(i / $scope.itemsPerPage_FOUR)] = [$scope.filteredItems_FOUR[i]];
                    } else {
                        $scope.pagedItems_FOUR[Math.floor(i / $scope.itemsPerPage_FOUR)].push($scope.filteredItems_FOUR[i]);
                    }
                }
            };

            $scope.prevPage_FOUR = function () {
                if ($scope.currentPage_FOUR > 0) {
                    $scope.currentPage_FOUR--;
                }
            };

            $scope.nextPage_FOUR = function () {
                if ($scope.currentPage_FOUR < $scope.pagedItems_FOUR.length - 1) {
                    $scope.currentPage_FOUR++;
                }
            };

            $scope.setPage_FOUR = function () {
                $scope.currentPage_FOUR = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_FOUR();


            // change sorting order
            $scope.sort_by_FOUR = function (newSortingOrder) {
                if ($scope.sortingOrder_FOUR == newSortingOrder)
                    $scope.reverse_FOUR = !$scope.reverse_FOUR;

                $scope.sortingOrder_FOUR = newSortingOrder;
            };

        }

        //function to get user
        me.getUser = function () {
            var userID = $routeParams.id;
            UserFactory.getUser(userID).then(function (user) {
                me.user = user;
            },
                function (errorResposne) {
                    Materialize.toast('Error Fetching User', 6000);
                }
            );
        }

        //function to update profile
        me.uploadProfile = function () {

            if (me.tempPicture == undefined) {
                return;
            }

            UserFactory.uploadProfile(me.tempPicture).then(function (user) {

                me.user.profilePicture = user.profilePicture + '?decached=' + Math.random();

                // update the controller user too
                $rootScope.user.profilePicture = user.profilePicture + '?decached=' + Math.random();

                // need to update the cookie value too
                AuthenticationFactory.saveUser($rootScope.user);

                $location.path('/user/profile/' + me.user.id);

                Materialize.toast('User Edited Successfully!', 6000);
            },
                function (errorResposne) {
                    Materialize.toast('Error Editing User', 6000);
                }
            );
        }

        //function to edit user
        me.editUser = function () {
            UserFactory.editUser(me.user).then(function () {
                $location.path('/user/profile/' + me.user.id, 6000);
                Materialize.toast('Profile Edited Successfully!', 6000);
            },
                function (errorResposne) {
                    Materialize.toast('Error Editing Profile', 6000);
                }
            );
        }

        //function to add contact information
        me.addContactInfo = function () {

            if (!me.user.moreDetails.id) {
                me.user.moreDetails.id = 0;
            }

            UserFactory.addEditMoreDetails(me.user.moreDetails).then(function () {
                $location.path('/user/profile/' + me.user.id, 6000);
                Materialize.toast('Contact Information Added Successfully', 6000);
            },
                function (errorResposne) {
                    Materialize.toast('Error Adding Contact Information', 6000);
                }
            );
        }

        //function to add edit education details
        me.addEditEducationDetails = function () {

            if (!me.user.educationDetails.id) {
                me.user.educationDetails.id = 0;
            }

            UserFactory.addEditEducationDetails(me.user.educationDetails).then(function () {
                $location.path('/user/profile/' + me.user.id, 6000);
                Materialize.toast('Contact Information Added Successfully', 6000);
            },
                function (errorResposne) {
                    Materialize.toast('Error Adding Contact Information', 6000);
                }
            );

        }

        //function to check old password
        me.checkOldPassword = function () {
            if (me.oldPassword !== undefined && me.oldPassword.length > 0) {
                UserFactory.checkOldPassword(me.oldPassword).then(function (response) {
                    if (response.status == 404) {
                        me.checkPassword = true;
                        $scope.changePassword.oldPassword.$setValidity("oldPassword", false);
                    } else {
                        me.checkPassword = false;
                        $scope.changePassword.oldPassword.$setValidity("oldPassword", true);
                    }
                }, function (error) {
                    me.checkPassword = false;
                    $scope.changePassword.oldPassword.$setValidity("oldPassword", true);
                });
            }
        }

        //function to change old password
        me.changePassword = function () {
            UserFactory.changePassword(me.password).then(function () {
                $route.reload();
                Materialize.toast('Password Changed Successfully!', 6000);
            },
                function (errorResposne) {
                    Materialize.toast('Error Changing Password', 6000);
                }
            );
        }

        //function to report User
        me.userReport = function () {
            me.reportUser.typeOfReport = 'USER';
            me.reportUser.userName = user.userName;
            me.reportUser.userId = user.id;
            var now = new Date();
            me.reportUser.dateTime = dateTimeFormat(now);
            me.reportUser.reportId = me.data.user.id;
            me.reportUser.title = me.data.user.userName;

            console.log(me.reportUser);

            UserFactory.reportUser(me.reportUser).then(function () {
                $location.path('/user/profile/' + me.reportUser.reportId);
                Materialize.toast('User Reported Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting User', 6000);
                }
            );
        }

        //function to block user
        me.blockUser = function (action, id) {
            UserFactory.blockUser(action, id).then(function () {
                $route.reload();
                Materialize.toast('User Blocked Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Blocking User', 6000);
                }
            );
        }

    }

]);