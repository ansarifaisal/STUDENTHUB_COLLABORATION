//List the routes here for user to navigate through the website.

window.routes = {
    //routing to access the Login page
    '/user/home': {
        //page path
        templateUrl: 'app/components/page/home.html',
        //controller that will handle this page
        controller: 'HomePageController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'homePageCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    //routing to access the Login page
    '/login': {
        templateUrl: 'app/components/authentication/login.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },
    //routing to access the error page
    '/error': {
        templateUrl: 'app/components/authentication/error.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },
    //routing to access the register page
    '/register': {
        templateUrl: 'app/components/authentication/register.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },

    //=========Forum Module Routing============>

    '/user/forums': {
        //page path
        templateUrl: 'app/components/forum/forums.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/create': {
        //page path
        templateUrl: 'app/components/forum/createForum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/edit/:id': {
        //page path
        templateUrl: 'app/components/forum/editForum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/view/:id': {
        //page path
        templateUrl: 'app/components/forum/forum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/report/:id': {
        //page path
        templateUrl: 'app/components/forum/reportForum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/members/:id': {
        //page path
        templateUrl: 'app/components/forum/forumMembers.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/members/pending/:id': {
        //page path
        templateUrl: 'app/components/forum/pendingMembers.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/edit/comment/:id': {
        //page path
        templateUrl: 'app/components/forum/editComment.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/comment/report/:id': {
        //page path
        templateUrl: 'app/components/forum/reportForumComment.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/topic/report/:id': {
        //page path
        templateUrl: 'app/components/forum/reportTopic.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forum/topic/edit/:id': {
        //page path
        templateUrl: 'app/components/forum/editTopic.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    '/user/forum/topic/view/:id': {
        //page path
        templateUrl: 'app/components/forum/singleforum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    '/user/forum/topic/comment/report/:id': {
        //page path
        templateUrl: 'app/components/forum/reportTopicComment.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    '/user/forum/topic/comment/edit/:id': {
        //page path
        templateUrl: 'app/components/forum/editTopicComment.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    //=========ForumCategory Module Routing============>

    '/user/forumcategories': {
        //page path
        templateUrl: 'app/components/forum/forumcategories.html',
        //controller that will handle this page
        controller: 'ForumCategoryController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCategoryCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/forumcategory': {
        //page path
        templateUrl: 'app/components/forum/forumcategory.html',
        //controller that will handle this page
        controller: 'ForumCategoryController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCategoryCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/admin/forumcategory/add': {
        //page path
        templateUrl: 'app/components/admin/addcategory.html',
        //controller that will handle this page
        controller: 'ForumCategoryController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCategoryCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<===========Forum Routing Module=============>
    '/user/addforum': {
        //page path
        templateUrl: 'app/components/forum/addforum.html',
        //controller that will handle this page
        controller: 'ForumCategoryController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCategoryCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    '/user/forum/details': {
        //page path
        templateUrl: 'app/components/forum/forumdetails.html',
        //controller that will handle this page
        controller: 'ForumCategoryController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCategoryCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    //<=============Blog Routing Module===========>

    '/user/blog/createBlog': {
        //page path
        templateUrl: 'app/components/blog/createBlog.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blog/edit/:id': {
        //page path
        templateUrl: 'app/components/blog/editBlog.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blogs': {
        //page path
        templateUrl: 'app/components/blog/blogList.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blog/view/:id': {
        //page path
        templateUrl: 'app/components/blog/blog.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blog/comment/edit/:id': {
        //page path
        templateUrl: 'app/components/blog/editBlogComment.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blog/comment/report/:id': {
        //page path
        templateUrl: 'app/components/blog/reportBlogComment.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/blog/report/:id': {
        //page path
        templateUrl: 'app/components/blog/blogReport.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },
    //<=============Event Routing Module===========>

    '/user/event/create': {
        //page path
        templateUrl: 'app/components/event/createEvent.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/events': {
        //page path
        templateUrl: 'app/components/event/eventList.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/event/view/:id': {
        //page path
        templateUrl: 'app/components/event/event.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/event/createEvent': {
        //page path
        templateUrl: 'app/components/event/createEvent.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/event/edit/:id': {
        //page path
        templateUrl: 'app/components/event/editEvent.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/event/report/:id': {
        //page path
        templateUrl: 'app/components/event/reportEvent.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    //<=============Job Routing Module===========>

    '/user/job/editJob/:id': {
        //page path
        templateUrl: 'app/components/job/editJob.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/job/report/:id': {
        //page path
        templateUrl: 'app/components/job/reportJob.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/job/createJob': {
        //page path
        templateUrl: 'app/components/job/createJob.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN', 'EMPLOYER']
    },

    '/user/jobs': {
        //page path
        templateUrl: 'app/components/job/jobList.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },


    '/user/job/view/:id': {
        //page path
        templateUrl: 'app/components/job/job.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    //<=============User Routing Module===========>

    '/user/profile/:id': {
        //page path
        templateUrl: 'app/components/user/profile.html',
        //controller that will handle this page
        controller: 'UserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/account/:id': {
        //page path
        templateUrl: 'app/components/user/account.html',
        //controller that will handle this page
        controller: 'UserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    '/user/inbox': {
        //page path
        templateUrl: 'app/components/user/inbox.html',
        //controller that will handle this page
        controller: 'UserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN', 'EMPLOYER']
    },

    //<=====================Manage User Module================>
    '/admin/manageuser': {
        //page path
        templateUrl: 'app/components/admin/manageuser.html',
        //controller that will handle this page
        controller: 'ManageUserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageUserCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/edituser/:id': {
        //page path
        templateUrl: 'app/components/admin/edituser.html',
        //controller that will handle this page
        controller: 'ManageUserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageUserCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Manage Blog Module================>

    '/admin/manageblogs': {
        //page path
        templateUrl: 'app/components/admin/manageblog.html',
        //controller that will handle this page
        controller: 'ManageBlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageBlogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/editblog/:id': {
        //page path
        templateUrl: 'app/components/admin/editblog.html',
        //controller that will handle this page
        controller: 'ManageBlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageBlogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Manage Forum Module================>

    '/admin/manageforums': {
        //page path
        templateUrl: 'app/components/admin/manageforum.html',
        //controller that will handle this page
        controller: 'ManageForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageForumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/editforum/:id': {
        //page path
        templateUrl: 'app/components/admin/editforum.html',
        //controller that will handle this page
        controller: 'ManageForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageForumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Manage Forum Module================>

    '/admin/managejobs': {
        //page path
        templateUrl: 'app/components/admin/managejob.html',
        //controller that will handle this page
        controller: 'ManageJobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageJobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/editjob/:id': {
        //page path
        templateUrl: 'app/components/admin/editjob.html',
        //controller that will handle this page
        controller: 'ManageJobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageJobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Manage Forum Module================>

    '/admin/manageevents': {
        //page path
        templateUrl: 'app/components/admin/manageevent.html',
        //controller that will handle this page
        controller: 'ManageEventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageEventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/editevent/:id': {
        //page path
        templateUrl: 'app/components/admin/editevent.html',
        //controller that will handle this page
        controller: 'ManageEventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageEventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Manage Forum Module================>

    '/admin/managetopics': {
        //page path
        templateUrl: 'app/components/admin/managetopic.html',
        //controller that will handle this page
        controller: 'ManageTopicController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageTopicCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/edittopic/:id': {
        //page path
        templateUrl: 'app/components/admin/edittopic.html',
        //controller that will handle this page
        controller: 'ManageTopicController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'manageTopicCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },


    //<=====================Blog Report Module================>

    '/admin/report/blogs': {
        //page path
        templateUrl: 'app/components/report/blogReport.html',
        //controller that will handle this page
        controller: 'BlogReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/blogs': {
        //page path
        templateUrl: 'app/components/report/handledBlogReport.html',
        //controller that will handle this page
        controller: 'BlogReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Blog Comment Report Module================>

    '/admin/report/blogcomments': {
        //page path
        templateUrl: 'app/components/report/blogCommentReport.html',
        //controller that will handle this page
        controller: 'BlogCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/blogComments': {
        //page path
        templateUrl: 'app/components/report/handledBlogCommentReport.html',
        //controller that will handle this page
        controller: 'BlogCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'BlogCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Job Report Module================>

    '/admin/report/job': {
        //page path
        templateUrl: 'app/components/report/jobReport.html',
        //controller that will handle this page
        controller: 'JobReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/job': {
        //page path
        templateUrl: 'app/components/report/handledJobReport.html',
        //controller that will handle this page
        controller: 'JobReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Job Report Module================>

    '/admin/report/events': {
        //page path
        templateUrl: 'app/components/report/eventReport.html',
        //controller that will handle this page
        controller: 'EventReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/events': {
        //page path
        templateUrl: 'app/components/report/handledEventReport.html',
        //controller that will handle this page
        controller: 'EventReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Forum Report Module================>

    '/admin/report/forums': {
        //page path
        templateUrl: 'app/components/report/forumReport.html',
        //controller that will handle this page
        controller: 'ForumReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/forums': {
        //page path
        templateUrl: 'app/components/report/handledForumReport.html',
        //controller that will handle this page
        controller: 'ForumReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Forum Report Module================>

    '/admin/report/forumcomments': {
        //page path
        templateUrl: 'app/components/report/forumCommentReport.html',
        //controller that will handle this page
        controller: 'ForumCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/forumcomments': {
        //page path
        templateUrl: 'app/components/report/handledForumCommentReport.html',
        //controller that will handle this page
        controller: 'ForumCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================Topic Report Module================>

    '/admin/report/topics': {
        //page path
        templateUrl: 'app/components/report/topicReport.html',
        //controller that will handle this page
        controller: 'TopicReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'topicReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/topics': {
        //page path
        templateUrl: 'app/components/report/handledTopicReport.html',
        //controller that will handle this page
        controller: 'TopicReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'topicReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },


    //<=====================Topic Report Module================>

    '/admin/report/topicComments': {
        //page path
        templateUrl: 'app/components/report/topicCommentReport.html',
        //controller that will handle this page
        controller: 'TopicCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'topicCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/topicComments': {
        //page path
        templateUrl: 'app/components/report/handledTopicCommentReport.html',
        //controller that will handle this page
        controller: 'TopicCommentReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'topicCommentReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    //<=====================User Report Module================>

    '/admin/report/users': {
        //page path
        templateUrl: 'app/components/report/userReport.html',
        //controller that will handle this page
        controller: 'UserReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

    '/admin/handled/users': {
        //page path
        templateUrl: 'app/components/report/handledUserReport.html',
        //controller that will handle this page
        controller: 'UserReportController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userReportCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },


    //<=====================Job Accept Module================>

    '/employer/appliedjob': {
        //page path
        templateUrl: 'app/components/employer/jobAccept.html',
        //controller that will handle this page
        controller: 'JobAcceptController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobAcceptCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'ADMIN']
    },

};

//Load all the routes
myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    //Allows the cookie with session id to be send back
    //$httpProvider.defaults.withCredntials = true;

    //Fill up the path in the $routeProvider the objects created before
    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }

    //setting up route definition that will be used on route change when no route definition is matched
    $routeProvider.otherwise({
        redirectTo: '/login'
    });

    //specify the hashPrefix to access the page
    $locationProvider.hashPrefix('!');

}]);


//When the app runs check whether the user navigating through 
//the website is authenticated and authorize to view the page
//run basically use for initialization 
myApp.run(function ($rootScope, $location, AuthenticationFactory) {

    //on method is use to listen on a event of a given type
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        if (next == current) {
            //if user trying to access page which requires login and is not logged in
            //load the user from the cookies
            $rootScope.user = AuthenticationFactory.loadUserFromCookie();
            //check whether the user is authenticated
            $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
            return;
        }


        //iterate through all the routes
        for (var path in window.routes) {

            //if routes is present make sure the user in authenticated
            //before login using the authentication service
            if (next.indexOf(path) != -1) {

                //if user trying to access page which requires login and is not logged in
                //load the user from the cookies
                $rootScope.user = AuthenticationFactory.loadUserFromCookie();
                //check whether the user is authenticated
                $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();

                //check if user requires login redirect user to the login page
                if (window.routes[path].requireLogin && !AuthenticationFactory.getUserIsAuthenticated()) {
                    $location.path('/login');
                    //if the user trying to access the page for which user is not authorize then redirect user to the erorr page
                } else if ((AuthenticationFactory.getUserIsAuthenticated()) && (window.routes[path].roles.indexOf(AuthenticationFactory.getRole()) == -1)) {
                    $location.path('/error');
                }
            }
        }
    });

    $rootScope.logout = function () {
        AuthenticationFactory.logout($rootScope.user).then(function () {
            debugger;
            AuthenticationFactory.setUserIsAuthenticated(false);
            $rootScope.authenticated = false;
            $rootScope.message = "Logout Successful!"
            $location.path('/login');
        }, function (error) {
            error = true;
        });
    };

});