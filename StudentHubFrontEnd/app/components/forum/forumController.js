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
            forumId: null,
            forumName: '',
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

            ForumFactory.createForum(me.newForum).then(function (forum) {
                console.log(forum);
                me.forumMember.userId = user.id;
                me.forumMember.userName = user.userName;
                me.forumMember.forum = forum;
                me.forumMember.imageURL = 'noPic.jpg';
                var now = new Date();
                me.forumMember.requestDate = dateTimeFormat(now);
                me.forumMember.role = 'ADMIN';
                me.forumMember.status = 'APPROVED';
                ForumFactory.joinForum(me.forumMember).then(function () {
                    console.log(me.forumMember);
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

            var comments = me.forum.comments;

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
                $location.path('/user/forums');
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
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Topic', 6000);
                }
            );
        }

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

        me.createTopicComment = function (){

            me.newTopicComment.topic = me.topic;
            me.newTopicComment.userId = user.id;
            me.newTopicComment.userName = user.userName;
            var now = new Date();
            me.newTopicComment.commentDate = dateTimeFormat(now);
            me.newTopicComment.noOfLikes = 0;
            me.newTopicComment.report = "NO";

            console.log(me.newTopicComment);

        }
    }
]);