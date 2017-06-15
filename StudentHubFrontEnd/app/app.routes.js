//List the routes here for user to navigate through the website.

window.routes = {
    //routing to access the Login page
    '/user/home': {
        //page path
        templateUrl: 'app/components/page/home.html',
        //controller that will handle this page
        controller: 'AuthenticationController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'authCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    '/user/forum': {
        //page path
        templateUrl: 'app/components/forum/forum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },
    '/user/forum/view': {
        //page path
        templateUrl: 'app/components/forum/singleforum.html',
        //controller that will handle this page
        controller: 'ForumController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'forumCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    //<=============Blog Routing Module===========>

    '/user/blog/create': {
        //page path
        templateUrl: 'app/components/blog/createBlog.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },
    '/user/blog/view': {
        //page path
        templateUrl: 'app/components/blog/blog.html',
        //controller that will handle this page
        controller: 'BlogController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'blogCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    '/user/event/view': {
        //page path
        templateUrl: 'app/components/event/event.html',
        //controller that will handle this page
        controller: 'EventController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'eventCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    //<=============Job Routing Module===========>

    '/user/job/create': {
        //page path
        templateUrl: 'app/components/job/createJob.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    '/user/job/view': {
        //page path
        templateUrl: 'app/components/job/job.html',
        //controller that will handle this page
        controller: 'JobController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'jobCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    //<=============User Routing Module===========>

    '/user/profile': {
        //page path
        templateUrl: 'app/components/user/profile.html',
        //controller that will handle this page
        controller: 'UserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
    },

    '/user/account': {
        //page path
        templateUrl: 'app/components/user/account.html',
        //controller that will handle this page
        controller: 'UserController',
        //nick name of the controller so that we dont have to declare the name in the HTML page
        controllerAs: 'userCtrl',
        //declaring own keys - requireLogin (check whether the page requires the user to be logged in)
        requireLogin: true,
        //roles is use to define which user can access this page
        roles: ['Super_Admin', 'USER', 'ADMIN']
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
        roles: ['Super_Admin', 'USER', 'ADMIN']
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