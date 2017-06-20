
/*
    <================================================================>
    |----------------------Manage User Controller--------------------|
    <================================================================>
*/

AdminModule.controller('ManageUserController', [
    'ManageUserFactory',
    '$scope',
    '$location',
    '$timeout',
    '$routeParams',
    '$log',
    'orderByFilter',
    '$route',
    '$filter',
    function (ManageUserFactory, $scope, $location, $timeout, $routeParams, $log, orderBy, $route, $filter) {

        var me = this;

        //Array to store all the users coming from the database
        me.users = [];

        //object to get the single user for editing
        me.user = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the users
        me.fetchAllUsers = function () {
            ManageUserFactory.fetchAllUsers().then(function (users) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = users;

                var searchMatch = function (haystack, needle) {
                    console.log(haystack);
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
                //error Callback function
                function (errorResponse) {
                    Materialize.toast('Error Fetching Users From The Database', 6000);
                }
            );
        }

        //function to get single user from the database
        me.getUser = function () {

            var userId = $routeParams.id;

            ManageUserFactory.getUser(userId).then(function (user) {
                me.user = user;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching User From The Database', 6000);
                }
            );
        }

        //function to edit the user
        me.editUser = function () {
            //console.log(me.user);
            ManageUserFactory.editUser(me.user).then(function () {
                $location.path('/admin/manageuser');
                Materialize.toast('User Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Editing User!', 6000);
                }
            );

        }

        //function to validate the user i.e approve, reject, disable
        me.validateUser = function (id, action) {
            ManageUserFactory.validateUser(id, action).then(function () {
                $route.reload();
                Materialize.toast('User ' + action + ' Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' The User', 6000);
                }
            );
        }

        //function to approve all the user at once
        me.validateAllUsers = function () {
            ManageUserFactory.validateAllUsers().then(function () {
                $route.reload();
                Materialize.toast('All Users Approved Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Approving Users');
                }

            );
        }


    }]);



/*
<=================================================================>
|----------------------Manage Blogs Controller--------------------|
<=================================================================>
*/

AdminModule.controller('ManageBlogController', [
    'ManageBlogFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$log',
    'orderByFilter',
    '$route',
    '$filter',
    function (ManageBlogFactory, $location, $scope, $timeout, $routeParams, $log, orderBy, $route, $filter) {

        var me = this;

        //array to store all the blogs
        me.blogs = [];

        //object to store single blog
        me.blog = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the blogs from the database
        me.fetchAllBlogs = function () {
            ManageBlogFactory.fetchAllBlogs().then(function (blogs) {
                
                var sortingOrder = 'blogId'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = blogs;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Materialize.toast('Error While Fetching Blogs From The Database', 6000);
                }
            );
        }

        //function to fetch the single blog
        me.getBlog = function () {
            var blogId = $routeParams.id;
            ManageBlogFactory.getBlog(blogId).then(function (blog) {
                me.blog = blog;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Blog From The Database', 6000)
                }
            );
        }

        //function to edit the blog
        me.editBlog = function () {
            //console.log(me.blog);
            ManageBlogFactory.editBlog(me.blog).then(function () {
                $location.path('/admin/manageblogs');
                Materialize.toast('Blog Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Editing Blog', 6000);
                });
        }

        //function to validate the blog
        me.validateBlog = function (id, action) {
            ManageBlogFactory.validateBlog(id, action).then(function () {
                $route.reload();
                Materialize.toast('Blog ' + action + ' Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' The Blog', 6000);
                }
            );
        }

        //function to approve all blogs
        me.validateAllBlogs = function () {
            ManageBlogFactory.validateAllBlogs().then(function () {
                $route.reload();
                Materialize.toast('Blogs Approved Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Approving Blogs!', 6000);
                }
            );
        }

    }
]);


/*
<=================================================================>
|----------------------Manage Forums Controller--------------------|
<=================================================================>
*/

AdminModule.controller('ManageForumController', [
    'ManageForumFactory',
    '$location',
    '$scope',
    '$routeParams',
    '$route',
    'orderByFilter',
    '$timeout',
    '$filter',
    function (ManageForumFactory, $location, $scope, $routeParams, $route, orderBy, $timeout, $filter) {

        var me = this;

        //array to store all the forums
        me.forums = [];

        //object to store
        me.forum = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the forum
        me.fetchAllForums = function () {
            ManageForumFactory.fetchAllForums().then(function (forums) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = forums;

                var searchMatch = function (haystack, needle) {
                    console.log(haystack);
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
                    Metrialize.toast('<strong>Error Fetching Forums</strong>', 6000);
                }
            );
        }

        //function to fetch single forum
        me.getForum = function () {
            var forumId = $routeParams.id;
            ManageForumFactory.getForum(forumId).then(function (forum) {
                me.forum = forum;
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Forum</strong>', 6000)
                }
            );
        }

        //function to edit the forum
        me.editForum = function () {
            ManageForumFactory.editForum(me.forum).then(function () {
                console.log(me.forum);
                $location.path('/admin/manageforums');
                Materialize.toast('<strong>Forum Update Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Editing Forum</strong>', 6000)
                });
        }

        //function to validate the forum
        me.validateForum = function (id, action) {
            ManageForumFactory.validateForum(id, action).then(function () {
                $route.reload();
                Materialize.toast('<strong>Forum ' + action + ' Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While ' + action + ' The Forum</strong>', 6000);
                });
        }

        //function to validate all the forum
        me.validateAllForums = function () {
            ManageForumFactory.validateAllForums().then(function () {
                $route.reload();
                Materialize.toast('<strong>All Forum Approved Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Approving The Forum</strong>', 6000);
                }
            );
        }

    }
]);


/*
<=================================================================>
|----------------------Manage Jobs Controller--------------------|
<=================================================================>
*/

AdminModule.controller('ManageJobController', [
    'ManageJobFactory',
    '$location',
    '$scope',
    '$routeParams',
    '$route',
    'orderByFilter',
    '$timeout',
    '$filter',
    function (ManageJobFactory, $location, $scope, $routeParams, $route, orderBy, $timeout, $filter) {

        var me = this;

        //array to store all the jobs
        me.jobs = [];

        //object to store
        me.job = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the jobs
        me.fetchAllJobs = function () {
            ManageJobFactory.fetchAllJobs().then(function (jobs) {
              
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = jobs;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Metrialize.toast('<strong>Error Fetching Jobs</strong>', 6000);
                }
            );
        }

        //function to fetch single job
        me.getJob = function () {
            var jobId = $routeParams.id;
            ManageJobFactory.getJob(jobId).then(function (job) {
                me.job = job;
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Job</strong>', 6000)
                }
            );
        }

        //function to edit the job
        me.editJob = function () {
            ManageJobFactory.editJob(me.job).then(function () {
                $location.path('/admin/managejobs');
                Materialize.toast('<strong>Job Update Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Editing Job</strong>', 6000)
                });
        }

        //function to validate the Job
        me.validateJob = function (id, action) {
            ManageJobFactory.validateJob(id, action).then(function () {
                $route.reload();
                Materialize.toast('<strong>Job ' + action + ' Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While ' + action + ' The Job</strong>', 6000);
                });
        }

        //function to validate all the Job
        me.validateAllJobs = function () {
            ManageJobFactory.validateAllJobs().then(function () {
                $route.reload();
                Materialize.toast('<strong>All Job Approved Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Approving The Job</strong>', 6000);
                }
            );
        }

    }
]);


/*
<=================================================================>
|----------------------Manage Events Controller--------------------|
<=================================================================>
*/

AdminModule.controller('ManageEventController', [
    'ManageEventFactory',
    '$location',
    '$scope',
    '$routeParams',
    '$route',
    'orderByFilter',
    '$timeout',
    '$filter',
    function (ManageEventFactory, $location, $scope, $routeParams, $route, orderBy, $timeout, $filter) {

        var me = this;

        //array to store all the events
        me.events = [];

        //object to store
        me.event = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the events
        me.fetchAllEvents = function () {
            ManageEventFactory.fetchAllEvents().then(function (events) {

                 var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = events;

                var searchMatch = function (haystack, needle) {
                    console.log(haystack);
                    if (!needle) {
                        
                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };

                // init the filtered items
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                        for (var attr in item) {
                            if (searchMatch(item['eventTitle'], $scope.query))
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
                    Metrialize.toast('<strong>Error Fetching Events</strong>', 6000);
                }
            );
        }

        //function to fetch single event
        me.getEvent = function () {
            var eventId = $routeParams.id;
            ManageEventFactory.getEvent(eventId).then(function (event) {
                me.event = event;
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Event</strong>', 6000)
                }
            );
        }

        //function to edit the event
        me.editEvent = function () {
            ManageEventFactory.editEvent(me.event).then(function () {
                $location.path('/admin/manageevents');
                Materialize.toast('<strong>Event Update Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Editing Event</strong>', 6000)
                });
        }

        //function to validate the Event
        me.validateEvent = function (id, action) {
            ManageEventFactory.validateEvent(id, action).then(function () {
                $route.reload();
                Materialize.toast('<strong>Event ' + action + ' Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While ' + action + ' The Event</strong>', 6000);
                });
        }

        //function to validate all the Event
        me.validateAllEvents = function () {
            ManageEventFactory.validateAllEvents().then(function () {
                $route.reload();
                Materialize.toast('<strong>All Event Approved Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Approving The Event</strong>', 6000);
                }
            );
        }

    }
]);



/*
<=================================================================>
|----------------------Manage Topics Controller--------------------|
<=================================================================>
*/

AdminModule.controller('ManageTopicController', [
    'ManageTopicFactory',
    '$location',
    '$scope',
    '$routeParams',
    '$route',
    'orderByFilter',
    '$timeout',
    '$filter',
    function (ManageTopicFactory, $location, $scope, $routeParams, $route, orderBy, $timeout, $filter) {

        var me = this;

        //array to store all the topics
        me.topics = [];

        //object to store
        me.topic = {};

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch all the topics
        me.fetchAllTopics = function () {
            ManageTopicFactory.fetchAllTopics().then(function (topics) {
                me.topics = topics;

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = false;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = topics;

                var searchMatch = function (haystack, needle) {
                    console.log(haystack);
                    if (!needle) {
                        
                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };

                // init the filtered items
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                        for (var attr in item) {
                            if (searchMatch(item['title'], $scope.query))
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
                    Metrialize.toast('<strong>Error Fetching Topics</strong>', 6000);
                }
            );
        }

        //function to fetch single topic
        me.getTopic = function () {
            var topicId = $routeParams.id;
            ManageTopicFactory.getTopic(topicId).then(function (topic) {
                me.topic = topic;
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Topic</strong>', 6000)
                }
            );
        }

        //function to edit the topic
        me.editTopic = function () {
            ManageTopicFactory.editTopic(me.topic).then(function () {
                $location.path('/admin/managetopics');
                Materialize.toast('<strong>Topic Update Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Editing Topic</strong>', 6000)
                });
        }

        //function to validate the Topic
        me.validateTopic = function (id, action) {
            ManageTopicFactory.validateTopic(id, action).then(function () {
                $route.reload();
                Materialize.toast('<strong>Topic ' + action + ' Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While ' + action + ' The Topic</strong>', 6000);
                });
        }

        //function to validate all the Topic
        me.validateAllTopics = function () {
            ManageTopicFactory.validateAllTopics().then(function () {
                $route.reload();
                Materialize.toast('<strong>All Topic Approved Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Topic Approving The Event</strong>', 6000);
                }
            );
        }

    }
]);