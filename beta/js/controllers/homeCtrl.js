angular.module("myApp")
.controller("homeCtrl",function ($scope,$rootScope,$http,$timeout,$uibModal,$state,$st,Auth,API_URL, AUTH_EVENTS, USER_ROLES) {

        $scope.modalShown = false;
        var showLoginDialog = function() {

            $state.go('app.login')
        };
	
        var setCurrentUser = function(){
            $scope.currentUser = $rootScope.currentUser;
        }
        
        var showNotAuthorized = function(){
            // alert("Not Authorized");
        }
	
    $scope.currentUser = null;
 	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = Auth.isAuthorized;

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);


})
        
          