AuthenticationModule.controller('AuthenticationController', [
    //specifying the AuthenticationFactory in the controller to perform dependency injection
    'AuthenticationFactory',
    '$rootScope',
    '$location',
    '$timeout',
    '$scope',
    function (AuthenticationFactory, $rootScope, $location, $timeout, $scope) {

        //here `me` is use to reffer the current value

        var me = this;
        me.credentials = {};
        me.error = false;
        me.userNameExist = false;

        //defining the fields
        me.user = {
            id: undefined,
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            gender: '',
            dob: '',
            doj: ''
        };
        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //method to login
        me.doLogin = function () {
            AuthenticationFactory.login(me.credentials).then(function (user) {
                debugger;
                if (user.status === 'REJECT') {
                    me.error = true;
                    Materialize.toast('<strong>Sorry! Your Request Has Been Rejected</strong>', 6000);
                } else if (user.status === 'PENDING') {
                    me.error = true;
                    Materialize.toast('<strong>Sorry! Your Account Is Not Approved Yet, Please Wait</strong>', 6000);
                } else if (me.user.userName === null || me.user.userName === '' && me.user.password === null || me.user.password === null) {
                    me.error = true;
                    Materialize.toast('<strong>Please, Provide Correct Username and Password</strong>', 6000);
                } else if(user.status === 'DISABLED'){
                    me.error = true;
                    Materialize.toast('<strong>Your Account Has Been Disabled, Contact Administrator</strong>', 6000);
                } else {
                    AuthenticationFactory.setUserIsAuthenticated(true);
                    AuthenticationFactory.setRole(user.role);
                    $rootScope.message = 'Welcome ' + user.firstName;
                    AuthenticationFactory.saveUser(user);
                    switch (user.role) {
                        case 'Super_Admin':
                            me.isSuperAdmin = true;
                            $location.path('/user/home');
                            break;
                        case 'ADMIN':
                            me.isAdmin = true;
                            $location.path('/user/home');
                            break;
                        case 'USER':
                            me.isUser = true;
                            $location.path('/user/home');
                            break;
                        default:
                            $location.path('/error');
                    }
                    $rootScope.isLogin = true;
                }
            },
                function (error) {
                    AuthenticationFactory.setUserIsAuthenticated(false);
                    $rootScope.authenticated = false;
                    me.error = true;
                });
        }

        me.checkUserName = function () {
            var userName = me.user.userName;
            if (userName !== undefined && userName.length > 0) {
                AuthenticationFactory.checkUserName(userName).then(function (response) {
                    debugger;
                    console.log(response);
                    if (response.status === 302) {
                        me.userNameExist = true;
                        $scope.registerForm.userName.$setValidity("userName", false);
                    } else {
                        me.userNameExist = false;
                        $scope.registerForm.userName.$setValidity("userName", true);
                    }
                }, function (error) {
                    me.userNameExist = false;
                    $scope.registerForm.userName.$setValidity("userName", true);
                });
            }
        }

        me.doRegisteration = function () {

            //var date = new Date(me.user.dob).toISOString().slice(0, 10);

            var date = dateTimeFormat(me.user.dob);
            me.user.dob = date;
            console.log(me.user.dob);
            var dateDoj = new Date();
            console.log(dateDoj);
            me.user.doj = dateTimeFormat(dateDoj);
            console.log(me.user.doj);
            debugger;

            AuthenticationFactory.register(me.user).then(function () {
                AuthenticationFactory.setUserIsAuthenticated(false);
                $rootScope.authenticated = false;
                $location.path('/login');
                $rootScope.message = "Your Registeration Is Successful! You Will Get A Mail After Approval";
            }, function (error) {
                AuthenticationFactory.setUserIsAuthenticated(false);
                $rootScope.authenticated = false;
                me.error = true;
            }
            );
        }

        me.access = function () {
            access();
        }

    }


]);