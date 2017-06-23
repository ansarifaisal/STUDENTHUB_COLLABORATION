//creating angular module named Authentication
//ng-cookies is use to store the user details in to cookies so that we can get user detail thoughout the website
var AuthenticationModule = angular.module('AuthenticationModule', ['ngCookies']);

AuthenticationModule.factory('AuthenticationFactory', ['$http', '$q', '$rootScope', '$cookies', function ($http, $q, $rootScope, $cookies) {

    //url to get access the backend
    var url = 'http://localhost:9005/webapp/';
    //setting up this variable to check whether the user is authenticated
    var userIsAuthenticated = false;
    //setting up role of the user
    var role = 'GUEST';

    //creating object of authenticationFactory
    authenticationFactory = {
        //list of methods or we can say property of authenticationFactory
        setUserIsAuthenticated: setUserIsAuthenticated,
        getUserIsAuthenticated: getUserIsAuthenticated,
        checkUserName: checkUserName,
        saveUser: saveUser,
        loadUserFromCookie: loadUserFromCookie,
        setRole: setRole,
        getRole: getRole,
        login: login,
        register: register,
        logout: logout
    }

    //returning Factory object
    return authenticationFactory;

    //implementing the factory methods
    function setUserIsAuthenticated(value) {
        userIsAuthenticated = value;
    }

    function getUserIsAuthenticated() {
        return userIsAuthenticated;
    }

    function setRole(value) {
        role = value;
    }

    function getRole() {
        return role;
    }

    //function saveUser to save user data into cookies
    function saveUser(user) {
        //puting user into cookies
        $cookies.putObject('user', user);
        userIsAuthenticated = true;
        //setting us role
        role = user.role;
    }

    //function loadUserFromCookie to load if the user is already logged in
    function loadUserFromCookie() {
        //getting User Object from cookies
        user = $cookies.getObject('user');
        if (user) {
            userIsAuthenticated = true;
            role = user.role;
        } else {
            //if cookies is empty set user not authenticated and role as guest
            userIsAuthenticated = false;
            role = 'GUEST';
        }
        return user;
    }

    //function for login
    //here credentials contains the form data that we are setting to backend project
    function login(credentials) {
        //$q is the service that helps you run functions asynchronously, and 
        //use their return values when they are done processing
        //perform some asynchronous operation, resolve or reject the promise when appropriate.
        var deffered = $q.defer();
        $http.post(url + 'login', credentials).then(
            function (response) {
                deffered.resolve(response.data);
            },
            //callback function if any error occur
            function (error) {
                deffered.reject(error);
            }
        );
        return deffered.promise;
    }

    //function for register

    function register(user) {
        var deffered = $q.defer();
        $http.post(url + 'register', user).then(
            function (response) {
                deffered.resolve(response.data);
            },
            function (error) {
                deffered.reject(error);
            }
        );
        return deffered.promise;
    }


    //function to logout

    function logout(user) {

        var deffered = $q.defer();
        $http.post(url + 'logout', user).then(function (response) {
            $cookies.putObject('user', undefined);
            userIsAuthenticated = false;
            role = 'GUEST';
            deffered.resolve(response);
        }, function (error) {
            deffered.reject(error);
        });
        return deffered.promise;
    }

    //method to check whether the username exists

    function checkUserName(userName) {
        var deffered = $q.defer();
        $http.post(url + 'existingUser', userName).then(function (response) {
            deffered.resolve(response);
        }, function (error) {
            deffered.resolve(error);
        });
        return deffered.promise;
    }
}]);