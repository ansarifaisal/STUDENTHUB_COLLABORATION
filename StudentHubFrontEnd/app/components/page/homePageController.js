
HomePageModule.controller('HomePageController', [
    'HomePageFactory',
    'ForumFactory',
    'BlogFactory',
    '$scope',
    '$location',
    '$timeout',
    '$route',
    '$rootScope',
    function (HomePageFactory, ForumFactory, BlogFactory, $scope, $location, $timeout, $route, $rootScope) {

        var me = this;

        me.content = [];

        me.notification = {};

        $rootScope.rootNotification = {};

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

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //fetch all content
        me.fetchContent = function () {
            HomePageFactory.fetchContent().then(function (content) {
                me.content = content;

                me.pushNotification();
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Content From The Database', 6000);
                }
            );
        }

        //function to delete blog
        me.deleteBlog = function (action, id) {
            BlogFactory.deleteBlog(action, id).then(function () {
                $route.reload();
                Materialize.toast('Blog Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Blogs', 6000);
                }
            );
        }

        //function to get notification
        me.pushNotification = function () {
            HomePageFactory.notification().then(function (notification) {
                me.notification = notification;
                $rootScope.rootNotification = notification;

                if (user.role == 'Super_Admin' || user.role == 'ADMIN') {
                    if (me.notification.noOfPendingForums != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingForums + " Forums Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Forums", "#!/admin/manageforums");
                    }
                    if (me.notification.noOfPendingJobs != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingJobs + " Jobs Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Jobs", "#!/admin/manageforums");
                    }
                    if (me.notification.noOfPendingEvents != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingEvents + " Events Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Events", "#!/admin/manageevents");
                    }
                    if (me.notification.noOfPendingBlogs != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingBlogs + " Blogs Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Blogs", "#!/admin/manageblogs");
                    }
                    if (me.notification.noOfPendingTopics != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingTopics + " Topics Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Topics", "#!/admin/managetopics");
                    }
                    if (me.notification.noOfPendingUser != 0) {
                        me.showNotification("There Are " + me.notification.noOfPendingUser + " Users Waiting For Approval", "../assets/images/icon_graduate.png", "Pending Users", "#!/admin/manageuser");
                    }

                    //Reported Notification

                    if (me.notification.noOfForumReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfForumReported + " Forums Reported", "../assets/images/icon_graduate.png", "Reported Forums", "#!/admin/report/forums");
                    }
                    if (me.notification.noOfForumCommentReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfForumCommentReported + " Forum Comments Reported", "../assets/images/icon_graduate.png", "Reported Forum Comments", "#!/admin/report/forumcomments");
                    }
                    if (me.notification.noOfEventReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfEventReported + " Events Reported", "../assets/images/icon_graduate.png", "Events Reported", "#!/admin/report/events");
                    }
                    if (me.notification.noOfJobReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfJobReported + " Jobs Reported", "../assets/images/icon_graduate.png", "Jobs Reported", "#!/admin/report/job");
                    }
                    if (me.notification.noOfBlogReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfBlogReported + " Blogs Reported", "../assets/images/icon_graduate.png", "Blogs Reported", "#!/admin/report/blogs");
                    }
                    if (me.notification.noOfBlogCommentReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfBlogCommentReported + " Blog Comments Reported", "../assets/images/icon_graduate.png", "Blog Comments Reported", "#!/admin/report/blogcomments");
                    }
                    if (me.notification.noOfTopicReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfTopicReported + " Topics Reported", "../assets/images/icon_graduate.png", "Topics Reported", "#!/admin/report/topics");
                    }
                    if (me.notification.noOfTopicCommentReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfTopicCommentReported + " Topic Comments Reported", "../assets/images/icon_graduate.png", "Topic Comments Reported", "#!/admin/report/topicComments");
                    }
                    if (me.notification.noOfUserReported != 0) {
                        me.showNotification("There Are " + me.notification.noOfUserReported + " Users Reported", "../assets/images/icon_graduate.png", "User Reported", "#!/admin/report/users");
                    }

                }


            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Notification', 6000);
                }
            );
        }

        //function to show notification
        me.showNotification = function (theBody, theIcon, theTitle, redirectURL) {
            //getting permission
            //notification wont work in incognito mode
            Notification.requestPermission().then(function (result) {
                me.spawnNotification(theBody, theIcon, theTitle, redirectURL);
            });
        }

        //function to spawn notification
        me.spawnNotification = function (theBody, theIcon, theTitle, redirectURL) {
            var options = {
                body: theBody,
                icon: theIcon
            }
            var n = new Notification(theTitle, options);
            n.onclick = function (event) {
                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                n.close();
                window.open(redirectURL, '_blank');
            }
        }

        //function to delete forum for access from the home page
        me.deleteForum = function (action, id) {
            ForumFactory.deleteForum(action, id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Forum Deleted Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Deleting Forum</strong>', 6000);
                }
            );
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

    }
]);