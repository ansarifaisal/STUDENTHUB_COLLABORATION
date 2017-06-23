ForumModule.controller('ForumController', [
    'ForumFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ForumFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        var me = this;

        me.forum = {};

        me.reportForum = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        me.newForum = {

            id: null,
            userId: null,
            userName: '',
            forumName: '',
            forumDescription: '',
            createdDate: '',
            noOfRequest: null,
            imageURL: '',
            noOfMembers: '',
            noOfTopics: '',
            report: '',
            status: ''

        }

        me.forumMember = {
            id: null,
            userId: null,
            userName: '',
            forum: '',
            requestDate: '',
            status: ''
        }

        //function to fetch all forums

        me.fetchAllForums = function () {

            ForumFactory.fetchAllForums().then(function (forums) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = forums;

                var searchMatch = function (haystack, needle) {
                    if (!needle) {

                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };

                // init the filtered items
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                        for (var attr in item) {
                            if (searchMatch(item['forumName'], $scope.query))
                                return true;
                        }
                        return false;
                    });

                    //take care of the sorting order
                    if ($scope.sortingOrder !== '') {
                        $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                    }

                    $scope.currentPage = 0;
                    // now group by pages
                    $scope.groupToPages();
                };

                // show items per page
                $scope.perPage = function () {
                    $scope.groupToPages();
                };

                // calculate page in place
                $scope.groupToPages = function () {
                    $scope.pagedItems = [];

                    for (var i = 0; i < $scope.filteredItems.length; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                        } else {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                        }
                    }
                };

                $scope.prevPage = function () {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                };

                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.pagedItems.length - 1) {
                        $scope.currentPage++;
                    }
                };

                $scope.setPage = function () {
                    $scope.currentPage = this.n;
                };

                // functions have been describe process the data for display
                $scope.search();


                // change sorting order
                $scope.sort_by = function (newSortingOrder) {
                    if ($scope.sortingOrder == newSortingOrder)
                        $scope.reverse = !$scope.reverse;

                    $scope.sortingOrder = newSortingOrder;
                };

            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Forums</strong>', 6000);
                }
            );
        }

        //function to create forum
        me.createForum = function () {

            me.newForum.userId = user.id;
            me.newForum.userName = user.userName;
            var now = new Date();
            me.newForum.createdDate = dateTimeFormat(now);
            me.newForum.noOfRequest = 0;
            me.newForum.imageURL = 'noPic.jpg';
            me.newForum.noOfMembers = 0;
            me.newForum.noOfTopics = 0;
            me.newForum.report = 'NO';
            me.newForum.status = 'PENDING';

            console.log(me.newForum);

            ForumFactory.createForum(me.newForum).then(function () {
                $location.path('/user/forums');
                Materialize.toast('<strong>Forum Created Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Forums', 6000);
                }
            );
        }

        //function to get forum
        me.getForum = function () {
            var forumID = $routeParams.id;

            ForumFactory.getForum(forumID).then(function (forum) {
                me.forum = forum;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to editForum
        me.editForum = function () {
            console.log(me.forum);
            ForumFactory.editForum(me.forum).then(function () {
                $location.path('/user/forum/view/' + me.forum.id);
                Materialize.toast('Forum Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materiaize.toast('Error Editing Forum', 6000);
                });
        }

        //function to report forum
        me.forumReport = function () {
            me.reportForum.typeOfReport = 'FORUM';
            me.reportForum.userName = user.userName;
            me.reportForum.userId = user.id;
            var now = new Date();
            me.reportForum.dateTime = dateTimeFormat(now);
            me.reportForum.reportId = me.forum.id;
            me.reportForum.title = me.forum.forumName;

            ForumFactory.reportForum(me.reportForum).then(function () {
                $location.path('/user/forum/view/' + me.reportForum.reportId);
                Materialize.toast('Forum Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Forum', 6000);
                }
            );

        }

        //function to delete forum
        me.deleteForum = function (action, id) {
            ForumFactory.deleteForum(action, id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Forum Deleted Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Deleting Forum</strong>', 6000);
                });
        }

        //function to join forum
        me.joinForum = function (id) {
            ForumFactory.getForum(id).then(function (forum) {
                me.forumMember.userId = user.id;
                me.forumMember.userName = user.userName;
                me.forumMember.forum = forum;
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.status = 'PENDING';

                ForumFactory.joinForum(me.forumMember).then(function () {
                    $route.reload();
                    Materialize.toast('<strong>Forum Join Request Sent Successfully!</strong>', 6000);
                },
                    function (errorResponse) {
                        Materialize.toast('Error Joining Forum', 6000);
                    }
                );

            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );

        }

        //function to perform various action on Request
        me.performActionOnRequest = function(action, id){
            ForumFactory.performActionOnRequest(action, id).then(function(){
                $route.reload();
                Materialize.toast('<strong>Forum Request '+action+' Successfully!</strong>', 6000)
            },
            function(errorResponse){
                Materialize.toast('Error While '+action+' The Forum', 6000);
            });
        }


    }]);