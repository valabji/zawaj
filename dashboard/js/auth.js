angular.module('myApp')
.factory('Auth', [ '$http', '$rootScope','$state', '$window', 'Session', 'AUTH_EVENTS', 'API_URL',
function($http, $rootScope, $state , $window, Session, AUTH_EVENTS,API_URL) {
	var authService = {};
	
	
	//the login function
	authService.login = function(user, success, error) {
    $http.post(API_URL+'users/login',user).then(function (resp) {
      //this is my dummy technique, normally here the 
      //user is returned with his data from the db
      var users = resp.data;
      if (resp.data.success) {
        var loginData = resp.data.data.email;
        //insert your custom login function here 

        //set the browser session, to avoid relogin on refresh
        $window.sessionStorage["userInfo"] = JSON.stringify({
          "email": resp.data.data.email,
          "password": "12345678",
          "full_name": resp.data.data.fullname,
          "passport_id" : resp.data.data.passport_id
        });
				
          //delete password not to be seen clientside 
          delete loginData.password;
				
          //update current user into the Session service or $rootScope.currentUser
          //whatever you prefer
          Session.create(loginData);
          //or
          $rootScope.currentUser = loginData;
				
          //fire event of successful login
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          //run success function
          success(loginData);
        } else {
          //OR ELSE
          //unsuccessful login, fire login failed event for 
          //the according functions to run
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          error();
        }
      
    })
	};

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//check if the user is authorized to access the next route
	//this function can be also used on element level
	//e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
		Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    $state.go("app.login")
    $rootScope.logined = false
	}

	return authService;
} ]);