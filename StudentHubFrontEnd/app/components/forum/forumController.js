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
        }, 200);

        var me = this;

        me.forum = {};

        me.forums = [];

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
            imageURL: '',
            forum: '',
            requestDate: '',
            role: '',
            status: ''
        }

        me.twelveMembers = [];

        me.newForumComment = {
            id: null,
            forum: '',
            userId: null,
            userName: '',
            imageURL: '',
            comment: '',
            commentDate: '',
            report: ''
        };

        me.forumComment = {};

        me.reportForumComment = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        me.newTopic = {
            id: null,
            userId: '',
            userName: '',
            forum: '',
            title: '',
            imageURL: '',
            description: '',
            createdDate: '',
            noOfComments: '',
            noOfLikes: '',
            report: '',
            status: ''
        }

        me.topic = {};

        me.reportTopic = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        me.topicLikes = {
            id: null,
            topic: '',
            userId: null,
            userName: '',
            dateTime: ''
        }

        me.newTopicComment = {
            id: null,
            topic: '',
            userId: null,
            userName: '',
            topicComment: '',
            commentDate: '',
            noOfLikes: null,
            report: '',
        }

        me.topicComment = {};

        me.reportTopicComment = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null,
            commentId: '',
            status: ''
        };

        //function to fetch all forums

        me.fetchAllForums = function () {
            $scope.$emit('LOAD');
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

                me.fetchJoinedForums(forums);
                me.fetchCreatedForums(forums);
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Forums</strong>', 6000);
                }
            );
        }

        //function to fetch Joined forums

        me.fetchJoinedForums = function (forums) {
            me.joinedForums = [];

            for (var i = 0; i < forums.length; i++) {
                for (var j = 0; j < forums[i].members.length; j++) {
                    if (forums[i].members[j].userId == user.id && forums[i].members[j].role != 'ADMIN') {
                        me.joinedForums.push(forums[i]);
                    }
                }
            }

            var sortingOrder_ONE = 'id'; //default sort

            $scope.sortingOrder_ONE = sortingOrder_ONE;
            $scope.pageSizes_ONE = [5, 10, 25, 50];
            $scope.reverse_ONE = true;
            $scope.filteredItems_ONE = [];
            $scope.groupedItems_ONE = [];
            $scope.itemsPerPage_ONE = 10;
            $scope.pagedItems_ONE = [];
            $scope.currentPage_ONE = 0;
            $scope.items_ONE = me.joinedForums;

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

        //function to fetch created forums
        me.fetchCreatedForums = function (forums) {

            me.createdForums = [];

            for (var i = 0; i < forums.length; i++) {
                if (forums[i].userId == user.id) {
                    me.createdForums.push(forums[i]);
                }
            }


            var sortingOrder_TWO = 'id'; //default sort

            $scope.sortingOrder_TWO = sortingOrder_TWO;
            $scope.pageSizes_TWO = [5, 10, 25, 50];
            $scope.reverse_TWO = true;
            $scope.filteredItems_TWO = [];
            $scope.groupedItems_TWO = [];
            $scope.itemsPerPage_TWO = 10;
            $scope.pagedItems_TWO = [];
            $scope.currentPage_TWO = 0;
            $scope.items_TWO = me.createdForums;

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
                        if (searchMatch_TWO(item['forumName'], $scope.query_TWO))
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

        //function to create forum
        me.createForum = function () {
            $scope.$emit('LOAD');
            me.newForum.userId = user.id;
            me.newForum.userName = user.userName;
            var now = new Date();
            me.newForum.createdDate = dateTimeFormat(now);
            me.newForum.noOfRequest = 0;
            me.newForum.noOfMembers = 1;
            me.newForum.noOfTopics = 0;
            me.newForum.report = 'NO';
            if (user.role == 'Super_Admin' || user.role == 'ADMIN') {
                me.newForum.status = 'APPROVED';
            } else {
                me.newForum.status = 'PENDING';
            }
            if (!me.newForum.imageURL) {
                me.newForum.imageURL = 'NoCover.png';
            }


            ForumFactory.createForum(me.newForum, me.tempPicture).then(function (forum) {
                me.forumMember.userId = user.id;
                me.forumMember.userName = user.userName;
                me.forumMember.forum = forum;
                me.forumMember.imageURL = user.profilePicture;
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.role = 'ADMIN';
                me.forumMember.status = 'APPROVED';
                ForumFactory.joinForum(me.forumMember).then(function () {
                    $location.path('/user/forums');
                    $scope.$emit('UNLOAD');
                    Materialize.toast('<strong>Forum Created Successfully!</strong>', 6000);
                },
                    function (errorResponse) {
                        Materialize.toast('Error Creating Forum', 6000);
                    }
                );
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Forum', 6000);
                }
            );
        }

        //function to get forum
        me.getForum = function () {
            var forumID = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getForum(forumID).then(function (forum) {
                me.forum = forum;
                me.get12Members(forumID);
                me.getComments();
                me.fetchForumTopic(forumID);
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to editForum
        me.editForum = function () {
            $scope.$emit('LOAD');
            ForumFactory.editForum(me.forum, me.tempPicture).then(function () {
                $location.path('/user/forum/view/' + me.forum.id);
                $scope.$emit('UNLOAD');
                Materialize.toast('Forum Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materiaize.toast('Error Editing Forum', 6000);
                });
        }

        //function to report forum
        me.forumReport = function () {
            $scope.$emit('LOAD');
            me.reportForum.typeOfReport = 'FORUM';
            me.reportForum.userName = user.userName;
            me.reportForum.userId = user.id;
            var now = new Date();
            me.reportForum.dateTime = dateTimeFormat(now);
            me.reportForum.reportId = me.forum.id;
            me.reportForum.title = me.forum.forumName;

            ForumFactory.reportForum(me.reportForum).then(function () {
                $location.path('/user/forum/view/' + me.reportForum.reportId);
                $scope.$emit('UNLOAD');
                Materialize.toast('Forum Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Forum', 6000);
                }
            );

        }

        //function to delete forum
        me.deleteForum = function (action, id) {
            $scope.$emit('LOAD');
            ForumFactory.deleteForum(action, id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('<strong>Forum Deleted Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Deleting Forum</strong>', 6000);
                });
        }

        //function to join forum
        me.joinForum = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.getForum(id).then(function (forum) {
                me.forumMember.userId = user.id;
                me.forumMember.userName = user.userName;
                me.forumMember.forum = forum;
                me.forumMember.forumId = forum.id;
                me.forumMember.forumName = forum.forumName;
                me.forumMember.imageURL = 'noPic.jpg';
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.role = 'USER';
                me.forumMember.status = 'PENDING';
                ForumFactory.joinForum(me.forumMember).then(function () {
                    $route.reload();
                    $scope.$emit('UNLOAD');
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
        me.performActionOnRequest = function (action, id) {
            $scope.$emit('LOAD');
            ForumFactory.performActionOnRequest(action, id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('<strong>Forum Request ' + action + ' Successfully!</strong>', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On The Forum', 6000);
                });
        }

        //function to get 12 members;
        me.get12Members = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.get12Members(id).then(function (members) {
                me.twelveMembers = members;
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Members', 6000);
                }
            );
        }

        //function to get membets
        me.getMembers = function () {
            var forumID = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getForum(forumID).then(function (forum) {

                me.forum = forum;

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = forum['members'];

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
                            if (searchMatch(item['userName'], $scope.query))
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

                $scope.$emit('UNLOAD');

            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to approve all request
        me.approveAllRequest = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.approveAllRequest(id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('All Request Accepted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to perform action on forum
        me.performActionOnForum = function (action, id) {
            $scope.$emit('LOAD');
            ForumFactory.performActionOnForum(action, id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('<strong>Forum ' + action + ' Successfully!</strong>', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On The Forum', 6000);
                }
            );

        }

        //function to create forum comment

        me.createForumComment = function () {
            $scope.$emit('LOAD');
            me.newForumComment.forum = me.forum;
            me.newForumComment.userId = user.id;
            me.newForumComment.userName = user.userName;
            var now = new Date();
            me.newForumComment.commentDate = dateTimeFormat(now);
            me.newForumComment.report = 'NO';
            me.newForumComment.imageURL = user.profilePicture;

            ForumFactory.createForumComment(me.newForumComment).then(function () {
                //  $location.path('/user/forum/view/' + me.forum.id + '#discussion');
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Posted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Posting Your Comment', 6000);
                });

        }

        //function to sort comments

        me.getComments = function () {
            var forumID = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getForumComments(forumID).then(function (comments) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = comments;

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
                            if (searchMatch(item['userName'], $scope.query))
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
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );


        }

        //function to get comment
        me.getComment = function () {
            var commentId = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getForumComment(commentId).then(function (comment) {
                me.forumComment = comment;
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );
        }

        //function to edit comment
        me.editComment = function () {
            $scope.$emit('LOAD');
            ForumFactory.createForumComment(me.forumComment).then(function (comment) {
                $location.path('/user/forum/view/' + me.forumComment.forum.id);
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Comments', 6000);
                }
            );
        }

        //function to report comment
        me.reportComment = function () {
            $scope.$emit('LOAD');
            me.reportForumComment.typeOfReport = 'FORUM COMMENT';
            var now = new Date();
            me.reportForumComment.dateTime = dateTimeFormat(now);
            me.reportForumComment.userName = user.userName;
            me.reportForumComment.userId = user.id;
            var commentId = $routeParams.id;
            me.reportForumComment.reportId = commentId;
            me.reportForumComment.title = me.forumComment.comment;

            ForumFactory.reportForumComment(me.reportForumComment).then(function () {
                $location.path('/user/forum/view/' + me.forumComment.forum.id);
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Reporting Comment", 6000);
                });

        }

        //function to delete forumComment
        me.deleteForumComment = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.deleteForumComment(id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Deleting Comment", 6000)
                }
            );
        }

        //function to create topic
        me.createTopic = function () {
            $scope.$emit('LOAD');
            me.newTopic.userId = user.id;
            me.newTopic.userName = user.userName;
            me.newTopic.forum = me.forum;

            var now = new Date();
            me.newTopic.createdDate = dateTimeFormat(now);
            me.newTopic.noOfComments = 0;
            me.newTopic.noOfLikes = 0;
            me.newTopic.imageURL = "noPic.jpg";
            me.newTopic.report = "NO";
            if (user.role == 'Super_Admin' || user.role == 'ADMIN') {
                me.newTopic.status = "OPEN"
            } else {
                me.newTopic.status = "PENDING"
            }

            ForumFactory.createEditTopic(me.newTopic).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('Topic Created Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Topic', 6000);
                }
            );
        }

        //function to fetch forum topic
        me.fetchForumTopic = function (forumId) {
            $scope.$emit('LOAD');
            ForumFactory.fetchTopics(forumId).then(function (topics) {

                var sortingOrder_FOUR = 'id'; //default sort

                $scope.sortingOrder_FOUR = sortingOrder_FOUR;
                $scope.pageSizes_FOUR = [5, 10, 25, 50];
                $scope.reverse_FOUR = true;
                $scope.filteredItems_FOUR = [];
                $scope.groupedItems_FOUR = [];
                $scope.itemsPerPage_FOUR = 10;
                $scope.pagedItems_FOUR = [];
                $scope.currentPage_FOUR = 0;
                $scope.items_FOUR = topics;

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
                            if (searchMatch_FOUR(item['title'], me.test))
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

                me.fetchCreatedTopics(topics);
                me.fetchPendingTopics(topics);
                me.fetchRejectedTopics(topics);
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Topic', 6000);
                }
            );
        }

        //function to fetch created topic
        me.fetchCreatedTopics = function (topics) {
            me.createdTopics = [];

            for (var i = 0; i < topics.length; i++) {
                if (topics[i].userId == user.id) {
                    me.createdTopics.push(topics[i]);
                }
            }

            var sortingOrder_ONE = 'id'; //default sort

            $scope.sortingOrder_ONE = sortingOrder_ONE;
            $scope.pageSizes_ONE = [5, 10, 25, 50];
            $scope.reverse_ONE = true;
            $scope.filteredItems_ONE = [];
            $scope.groupedItems_ONE = [];
            $scope.itemsPerPage_ONE = 10;
            $scope.pagedItems_ONE = [];
            $scope.currentPage_ONE = 0;
            $scope.items_ONE = me.createdTopics;

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
                        if (searchMatch_ONE(item['title'], me.query_ONE))
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

        //function to fetch pending topic
        me.fetchPendingTopics = function (topics) {

            me.pendingTopics = [];

            for (var i = 0; i < topics.length; i++) {
                if (topics[i].status == 'PENDING') {
                    me.pendingTopics.push(topics[i]);
                }
            }

            var sortingOrder_TWO = 'id'; //default sort

            $scope.sortingOrder_TWO = sortingOrder_TWO;
            $scope.pageSizes_TWO = [5, 10, 25, 50];
            $scope.reverse_TWO = true;
            $scope.filteredItems_TWO = [];
            $scope.groupedItems_TWO = [];
            $scope.itemsPerPage_TWO = 10;
            $scope.pagedItems_TWO = [];
            $scope.currentPage_TWO = 0;
            $scope.items_TWO = me.pendingTopics;

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
                        if (searchMatch_TWO(item['title'], me.query_TWO))
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

        //function to fetch rejected topic
        me.fetchRejectedTopics = function (topics) {

            me.rejectedTopics = [];

            for (var i = 0; i < topics.length; i++) {
                if (topics[i].status == 'REJECTED') {
                    me.rejectedTopics.push(topics[i]);
                }
            }

            var sortingOrder_THREE = 'id'; //default sort

            $scope.sortingOrder_THREE = sortingOrder_THREE;
            $scope.pageSizes_THREE = [5, 10, 25, 50];
            $scope.reverse_THREE = true;
            $scope.filteredItems_THREE = [];
            $scope.groupedItems_THREE = [];
            $scope.itemsPerPage_THREE = 10;
            $scope.pagedItems_THREE = [];
            $scope.currentPage_THREE = 0;
            $scope.items_THREE = me.rejectedTopics;

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
                        if (searchMatch_THREE(item['title'], me.query_THREE))
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

        //function to perform action on topic
        me.performActionOnTopic = function (action, id) {
            $scope.$emit('LOAD');
            ForumFactory.performActionOnTopic(action, id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast("Topic " + action + " Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On Topic', 6000);
                }
            );
        }

        //function to approve all topics
        me.approveAllTopics = function () {
            $scope.$emit('LOAD');
            ForumFactory.approveAllTopics().then(function () {
                $route.reload();
                $scope.$emit('UnLOAD');
                Materialize.toast("Topics Opened Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Approving Topics', 6000);
                }
            );
        }

        //function to get topic
        me.getTopic = function () {
            var topicId = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getTopic(topicId).then(function (topic) {
                me.topic = topic;
                me.getTopicComments();
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Topic', 6000);
                }
            );
        }

        //function to report the topic
        me.topicReport = function () {
            $scope.$emit('LOAD');
            me.reportTopic.typeOfReport = 'TOPIC';
            me.reportTopic.userName = user.userName;
            me.reportTopic.userId = user.id;
            var now = new Date();
            me.reportTopic.dateTime = dateTimeFormat(now);
            me.reportTopic.reportId = me.topic.id;
            me.reportTopic.title = me.topic.title;

            ForumFactory.topicReport(me.reportTopic).then(function () {
                $location.path('/user/forum/topic/view/' + me.reportTopic.reportId);
                $scope.$emit('UNLOAD');
                Materialize.toast('Topic Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Forum', 6000);
                }
            );
        }

        //function to edit the topic
        me.editTopic = function () {
            $scope.$emit('LOAD');
            ForumFactory.createEditTopic(me.topic).then(function () {

                $location.path("/user/forum/view/" + me.topic.forum.id);
                $scope.$emit('UNLOAD');
                Materialize.toast('Topic Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Topic', 6000);
                }
            );
        }

        //function to like the topic
        me.likeTopic = function () {
            $scope.$emit('LOAD');
            me.topicLikes.topic = me.topic;
            me.topicLikes.userId = user.id;
            me.topicLikes.userName = user.userName;
            var now = new Date();
            me.topicLikes.dateTime = dateTimeFormat(now);

            ForumFactory.topicLike(me.topicLikes).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast("Topic Liked Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error While Liking The Topic", 6000);
                }
            );
        }

        // function to dislike the topic
        me.disLikeTopic = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.disLikeTopic(id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast("Topic Disliked Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Disliking Topic", 6000);
                }
            );
        }

        //function to create topic comment
        me.createTopicComment = function () {
            $scope.$emit('LOAD');
            me.newTopicComment.topic = me.topic;
            me.newTopicComment.userId = user.id;
            me.newTopicComment.userName = user.userName;
            var now = new Date();
            me.newTopicComment.commentDate = dateTimeFormat(now);
            me.newTopicComment.noOfLikes = 0;
            me.newTopicComment.report = "NO";

            ForumFactory.createTopicComment(me.newTopicComment).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Posted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Posting Comment', 6000);
                });

        }

        //function to get topic comments
        me.getTopicComments = function () {
            var topicId = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.fetchTopicComments(topicId).then(function (topicComments) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = topicComments;

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
                $scope.$emit('UNLOAD');

            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );
        }

        //function to get topic comment
        me.getTopicComment = function () {
            var commentID = $routeParams.id;
            $scope.$emit('LOAD');
            ForumFactory.getTopicComment(commentID).then(function (topicComment) {
                me.topicComment = topicComment;
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comment', 6000);
                }
            );
        }

        //funtion to report topic comment
        me.topicCommentReport = function () {
            $scope.$emit('LOAD');
            me.reportTopicComment.userName = user.userName;
            me.reportTopicComment.userId = user.id;
            me.reportTopicComment.title = me.topicComment.topicComment;
            me.reportTopicComment.typeOfReport = "TOPIC COMMENT";
            var now = new Date();
            me.reportTopicComment.dateTime = dateTimeFormat(now);
            me.reportTopicComment.reportId = me.topicComment.topic.id;
            var commentID = $routeParams.id;
            me.reportTopicComment.commentId = commentID;
            me.reportTopicComment.status = "UNREAD";

            ForumFactory.reportTopicComment(me.reportTopicComment).then(function () {
                $location.path('/user/forum/topic/view/' + me.reportTopicComment.reportId);
                $scope.$emit('UNLOAD');
                Materialize.toast('Topic Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Comment', 6000);
                }
            );

        }

        //funtion to edit topic comment
        me.editTopicComment = function () {
            $scope.$emit('LOAD');
            ForumFactory.editTopicComment(me.topicComment).then(function () {
                $location.path('/user/forum/topic/view/' + me.topicComment.topic.id);
                Materialize.toast('Comment Editing Successfully!', 6000);
                $scope.$emit('UNLOAD');
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Comment', 6000);
                }
            );
        }

        //function to delete topic comment
        me.deleteTopicComment = function (id) {
            $scope.$emit('LOAD');
            ForumFactory.deleteTopicComment(id).then(function () {
                $route.reload();
                $scope.$emit('UNLOAD');
                Materialize.toast('Comment Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Comment', 6000);
                });
        }
    }
]);


ForumModule.run(function ($rootScope) {

    $rootScope.$on('LOAD', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('UNLOAD', function () {
        $rootScope.loading = false;
    });
});
