
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
    function (ManageUserFactory, $scope, $location, $timeout, $routeParams, $log, orderBy, $route) {

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

                //watch to sort the users
                $scope.$watch(function () {
                    propertyName = $scope.sortBy;
                    me.users = orderBy(users, propertyName);
                });

                $scope.filteredUsers = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;

                //watch for pagination
                $scope.$watch(function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;
                    $scope.filteredUsers = me.users.slice(begin, end);
                });

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
    function (ManageBlogFactory, $location, $scope, $timeout, $routeParams, $log, orderBy, $route) {

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
                me.blogs = blogs;
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
    function (ManageForumFactory, $location, $scope, $routeParams, $route, orderBy, $timeout) {

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
                me.forums = forums;
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
    function (ManageJobFactory, $location, $scope, $routeParams, $route, orderBy, $timeout) {

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
                me.jobs = jobs;
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
    function (ManageEventFactory, $location, $scope, $routeParams, $route, orderBy, $timeout) {

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
                me.events = events;
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