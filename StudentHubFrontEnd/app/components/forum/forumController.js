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

            ForumFactory.createForum(me.newForum).then(function (forum) {
                me.forumMember.userId = user.id;
                me.forumMember.userName = user.userName;
                me.forumMember.forum = forum;
                me.forumMember.imageURL = 'noPic.jpg';
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.role = 'ADMIN';
                me.forumMember.status = 'APPROVED';
                ForumFactory.joinForum(me.forumMember).then(function () {
                    $location.path('/user/forums');
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

            ForumFactory.getForum(forumID).then(function (forum) {
                me.forum = forum;
                me.get12Members(forumID);
                me.getComments();
                me.fetchForumTopic(forumID);
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
                me.forumMember.forumId = forum.id;
                me.forumMember.forumName = forum.forumName;
                me.forumMember.imageURL = 'noPic.jpg';
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.role = 'USER';
                me.forumMember.status = 'PENDING';
                console.log(me.forumMember);
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
        me.performActionOnRequest = function (action, id) {
            ForumFactory.performActionOnRequest(action, id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Forum Request ' + action + ' Successfully!</strong>', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On The Forum', 6000);
                });
        }

        //function to get 12 members;
        me.get12Members = function (id) {
            ForumFactory.get12Members(id).then(function (members) {
                me.twelveMembers = members;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Members', 6000);
                }
            );
        }

        //function to get membets
        me.getMembers = function () {
            var forumID = $routeParams.id;

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

            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to approve all request
        me.approveAllRequest = function (id) {

            ForumFactory.approveAllRequest(id).then(function () {
                $route.reload();
                Materialize.toast('All Request Accepted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Forum', 6000);
                }
            );
        }

        //function to perform action on forum
        me.performActionOnForum = function (action, id) {

            ForumFactory.performActionOnForum(action, id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Forum ' + action + ' Successfully!</strong>', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On The Forum', 6000);
                }
            );

        }

        //function to create forum comment

        me.createForumComment = function () {
            me.newForumComment.forum = me.forum;
            me.newForumComment.userId = user.id;
            me.newForumComment.userName = user.userName;
            var now = new Date();
            me.newForumComment.commentDate = dateTimeFormat(now);
            me.newForumComment.report = 'NO';


            ForumFactory.createForumComment(me.newForumComment).then(function () {
                //  $location.path('/user/forum/view/' + me.forum.id + '#discussion');
                $route.reload();
                Materialize.toast('Comment Posted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Posting Your Comment', 6000);
                });

        }

        //function to sort comments

        me.getComments = function () {
            var forumID = $routeParams.id;
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
            },
                function (errorResponse) {

                }
            );


        }

        //function to get comment
        me.getComment = function () {
            var commentId = $routeParams.id;

            ForumFactory.getForumComment(commentId).then(function (comment) {
                me.forumComment = comment;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );
        }

        //function to edit comment
        me.editComment = function () {
            ForumFactory.createForumComment(me.forumComment).then(function (comment) {
                $location.path('/user/forum/view/' + me.forumComment.forum.id);
                Materialize.toast('Comment Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Comments', 6000);
                }
            );
        }

        me.reportComment = function () {

            me.reportForumComment.typeOfReport = 'FORUM COMMENT';
            var now = new Date();
            me.reportForumComment.dateTime = dateTimeFormat(now);
            me.reportForumComment.userName = user.userName;
            me.reportForumComment.userId = user.id;
            var commentId = $routeParams.id;
            me.reportForumComment.reportId = commentId;
            me.reportForumComment.title = me.forumComment.comment;

            ForumFactory.reportForumComment(me.reportForumComment).then(function () {
                $location.path('/user/forums');
                Materialize.toast('Comment Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Reporting Comment", 6000);
                });

        }

        //function to delete forumComment
        me.deleteForumComment = function (id) {
            ForumFactory.deleteForumComment(id).then(function () {
                $route.reload();
                Materialize.toast('Comment Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Deleting Comment", 6000)
                });
        }

        //function to create topic
        me.createTopic = function () {
            me.newTopic.userId = user.id;
            me.newTopic.userName = user.userName;
            me.newTopic.forum = me.forum;
            //console.log(me.forum);
            var now = new Date();
            me.newTopic.createdDate = dateTimeFormat(now);
            me.newTopic.noOfComments = 0;
            me.newTopic.noOfLikes = 0;
            me.newTopic.imageURL = "noPic.jpg";
            me.newTopic.report = "NO";
            me.newTopic.status = "PENDING"

            console.log(me.newTopic);

            ForumFactory.createEditTopic(me.newTopic).then(function () {
                $route.reload();
                Materialize.toast('Topic Created Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Topic', 6000);
                }
            );
        }

        //function to fetch forum topic
        me.fetchForumTopic = function (forumId) {
            ForumFactory.fetchTopics(forumId).then(function (topics) {

                var topicSortingOrder = 'id'; //default sort

                $scope.topicSortingOrder = topicSortingOrder;
                $scope.topicPageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredTopics = [];
                $scope.groupedTopics = [];
                $scope.topicPerPage = 10;
                $scope.pagedTopics = [];
                $scope.topicPage = 0;
                $scope.topics = topics;

                var searchMatched = function (haystack, needle) {
                    if (!needle) {

                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };

                // init the filtered topics
                $scope.searched = function () {
                    $scope.filteredTopics = $filter('filter')($scope.topics, function (item) {
                        for (var attr in item) {
                            if (searchMatched(item['title'], $scope.queried))
                                return true;
                        }
                        return false;
                    });

                    //take care of the sorting order
                    if ($scope.topicSortingOrder !== '') {
                        $scope.filteredTopics = $filter('orderBy')($scope.filteredTopics, $scope.topicSortingOrder, $scope.reverse);
                    }

                    $scope.topicPage = 0;
                    // now group by pages
                    $scope.groupToTopicPages();
                };

                // show items per page
                $scope.perPageTopic = function () {
                    $scope.groupToTopicPages();
                };

                // calculate page in place
                $scope.groupToTopicPages = function () {
                    $scope.pagedTopics = [];

                    for (var i = 0; i < $scope.filteredTopics.length; i++) {
                        if (i % $scope.topicPerPage === 0) {
                            $scope.pagedTopics[Math.floor(i / $scope.topicPerPage)] = [$scope.filteredTopics[i]];
                        } else {
                            $scope.pagedTopics[Math.floor(i / $scope.topicPerPage)].push($scope.filteredTopics[i]);
                        }
                    }
                };

                $scope.prevTopicPage = function () {
                    if ($scope.topicPage > 0) {
                        $scope.topicPage--;
                    }
                };

                $scope.nextTopicPage = function () {
                    if ($scope.topicPage < $scope.pagedTopics.length - 1) {
                        $scope.topicPage++;
                    }
                };

                $scope.setTopicPage = function () {
                    $scope.topicPage = this.n;
                };

                // functions have been describe process the data for display
                $scope.searched();


                // change sorting order
                $scope.topicSort_by = function (newSortingOrder) {
                    if ($scope.topicSortingOrder == newSortingOrder)
                        $scope.reverse = !$scope.reverse;

                    $scope.topicSortingOrder = newSortingOrder;
                };

            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Topic', 6000);
                }
            );
        }

        //function to perform action on topic
        me.performActionOnTopic = function (action, id) {
            ForumFactory.performActionOnTopic(action, id).then(function () {
                $route.reload();
                Materialize.toast("Topic " + action + " Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' On Topic', 6000);
                }
            );
        }

        //function to approve all topics
        me.approveAllTopics = function () {
            ForumFactory.approveAllTopics().then(function () {
                $route.reload();
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
            ForumFactory.getTopic(topicId).then(function (topic) {
                me.topic = topic;
                me.getTopicComments();
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Topic', 6000);
                }
            );
        }

        //function to report the topic
        me.topicReport = function () {
            me.reportTopic.typeOfReport = 'TOPIC';
            me.reportTopic.userName = user.userName;
            me.reportTopic.userId = user.id;
            var now = new Date();
            me.reportTopic.dateTime = dateTimeFormat(now);
            me.reportTopic.reportId = me.topic.id;
            me.reportTopic.title = me.topic.title;

            console.log(me.topic.forum.id);

            ForumFactory.topicReport(me.reportTopic).then(function () {
                $location.path('/user/forum/topic/view/' + me.reportTopic.reportId);
                Materialize.toast('Topic Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Forum', 6000);
                }
            );
        }

        //function to edit the topic
        me.editTopic = function () {

            ForumFactory.createEditTopic(me.topic).then(function () {

                $location.path("/user/forum/view/" + me.topic.forum.id);
                Materialize.toast('Topic Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Topic', 6000);
                }
            );
        }

        //function to like the topic
        me.likeTopic = function () {
            me.topicLikes.topic = me.topic;
            me.topicLikes.userId = user.id;
            me.topicLikes.userName = user.userName;
            var now = new Date();
            me.topicLikes.dateTime = dateTimeFormat(now);

            ForumFactory.topicLike(me.topicLikes).then(function () {
                $route.reload();
                Materialize.toast("Topic Liked Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error While Liking The Topic", 6000);
                }
            );
        }

        // function to dislike the topic
        me.disLikeTopic = function (id) {
            ForumFactory.disLikeTopic(id).then(function () {
                $route.reload();
                Materialize.toast("Topic Disliked Successfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Disliking Topic", 6000);
                }
            );
        }

        //function to create topic comment
        me.createTopicComment = function () {

            me.newTopicComment.topic = me.topic;
            me.newTopicComment.userId = user.id;
            me.newTopicComment.userName = user.userName;
            var now = new Date();
            me.newTopicComment.commentDate = dateTimeFormat(now);
            me.newTopicComment.noOfLikes = 0;
            me.newTopicComment.report = "NO";

            console.log(me.newTopicComment);

            ForumFactory.createTopicComment(me.newTopicComment).then(function () {
                $route.reload();
                Materialize.toast('Comment Posted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Posting Comment', 6000);
                });

        }

        //function to get topic comments
        me.getTopicComments = function () {
            var topicId = $routeParams.id;
            ForumFactory.fetchTopicComments(topicId).then(function (topicComments) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 5;
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


            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );
        }

        //function to get topic comment
        me.getTopicComment = function () {
            var commentID = $routeParams.id;
            ForumFactory.getTopicComment(commentID).then(function (topicComment) {
                me.topicComment = topicComment;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comment', 6000);
                }
            );
        }

        me.topicCommentReport = function () {
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
                Materialize.toast('Topic Reported Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Comment', 6000);
                }
            );

        }

        me.editTopicComment = function () {
            ForumFactory.editTopicComment(me.topicComment).then(function () {
                $location.path('/user/forum/topic/view/' + me.topicComment.topic.id);
                Materialize.toast('Comment Editing Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Comment', 6000);
                }
            );
        }

        me.deleteTopicComment = function (id) {
            ForumFactory.deleteTopicComment(id).then(function () {
                $route.reload();
                Materialize.toast('Comment Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Comment', 6000);
                });
        }
    }
]);