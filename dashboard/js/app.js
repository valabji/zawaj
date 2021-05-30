String.prototype.isNumber = String.prototype.isNumber ||
    function () {
        "use strict";
        return /^[-]?\d+$/.test(this.toString());
    };

'use strict';

angular.module("myApp",['ngAnimate', 'ngSanitize', 'ui.bootstrap','ui.router','angularUtils.directives.dirPagination','datatables'])
    .config(function ($stateProvider,$urlRouterProvider,$httpProvider,USER_ROLES) {

        $stateProvider
            .state("app",{
                url:"/app",
                views:{
                    "main":{
                        templateUrl:"templates/main.html",
                        controller:"appCtrl"
                    }
                }
            })


            .state("app.home",{
                url:"/home",
                views:{
                    "sub":{
                        templateUrl:"templates/home.html",
                        controller:"homeCtrl"
                    }
                }
            })
            
            .state("app.Register",{
                url:"/Register",
                views:{
                    "sub":{
                        templateUrl:"templates/Register.html",
                        controller:"RegisterCtrl"
                    }
                }
            })


            .state("app.User",{
                url: "/User",
                
                  data: {
                                authorizedRoles: [USER_ROLES.editor, USER_ROLES.guest]
                            },            
                views:{
                    "sub":{
                        templateUrl:"templates/User.html",
                        controller: "usersCtrl",
                        
                    }
                    
                }
            })

            .state("app.bIndex",{
                url:"/bIndex",
                views:{
                    "sub":{
                        templateUrl:"templates/bIndex.html",
                        controller:"bundlesCtrl"
                    }
                }
            })
 
            .state("app.CityIndex",{
                url:"/CityIndex",
                views:{
                    "sub":{
                        templateUrl:"templates/CityIndex.html",
                        controller:"CityIndexCtrl"
                    }
                }
            })

            .state("app.TermsAndConditions",{
                url:"/TermsAndConditions",
                views:{
                    "sub":{
                        templateUrl:"templates/TermsAndConditions.html",
                        controller:"appCtrl"
                    }
                }
            })


            .state("app.SocialIndex",{
                url:"/SocialIndex",
                views:{
                    "sub":{
                        templateUrl:"templates/SocialIndex.html",
                        controller:"SocialIndexCtrl"
                    }
                }
            })

            .state("app.assembly_items",{
                url:"/assembly_items",
                views:{
                    "sub":{
                        templateUrl:"templates/assembly_items.html",
                        controller:"assembly_itemsCtrl"
                    }
                }
            })


            .state("app.login",{
                url:"/login",
                views:{
                    "sub":{
                        templateUrl:"templates/login.html",
                        controller:"loginCtrl"
                    }
                }
            })


            

            .state("app.add_outgoing_type",{
                url:"/add_outgoing_type",
                views:{
                    "sub":{
                        templateUrl:"templates/add_outgoing_type.html",
                        controller:"outgoingCtrl"
                    }
                }
            })   
            
            .state("app.add_outgoing",{
                url:"/add_outgoing",
                views:{
                    "sub":{
                        templateUrl:"templates/add_outgoing.html",
                        controller:"outgoingCtrl"
                    }
                }
            })


            .state("app.Profile",{
                url:"/Profile",
                views:{
                    "sub":{
                        templateUrl:"templates/Profile.html",
                        controller:"profileCtrl"
                    }
                }
            })
            

            .state("app.requestes",{
                url:"/requestes",
                views:{
                    "sub":{
                        templateUrl:"templates/requestes.html",
                        controller:"requestesCtrl"
                    }
                }
            })

            .state("app.orderes",{
                url:"/orderes",
                views:{
                    "sub":{
                        templateUrl:"templates/orderes.html",
                        controller:"orderesCtrl"
                    }
                }
            })
            
            .state("app.manegment_orderes",{
                url:"/manegment_orderes",
                views:{
                    "sub":{
                        templateUrl:"templates/manegment_orderes.html",
                        controller:"orderesCtrl"
                    }
                }
            })
            
            
            .state("app.leaderes",{
                url:"/leaderes",
                views:{
                    "sub":{
                        templateUrl:"templates/leaderes.html",
                        controller:"leaderesCtrl"
                    }
                }
            })
            
            
             
            

     
        $urlRouterProvider.otherwise("/app/home");
  
        $httpProvider.defaults.useXDomain = true;
    })


    .constant('API_URL', 'https://zwajni.com/api/')

    .service("$st",function ($rootScope,$state) {
       
        // this.err=function () {
        //     toastr.warning('لا يوجد اتصال بالانترنت', {timeOut: 5000})
        // }

    })

    .service("$ModalService",function ($rootScope,$state) {
       
        this.OpenModal=function (ModalName) {
            $(ModalName).modal('show')
        }

        this.HideModal=function (ModalName) {
            $(ModalName).modal('hide')
        }

    })
    
    .filter('num', function() {
        return function(input) {
          return parseInt(input);
        }
    })


    .factory('$localStorage', ['$window', function($window) {
        return {
          set: function(key, value) {
            $window.localStorage[key] = value;
          },
          get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
          },
          setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
          },
          getObject: function(key,def) {
            return JSON.parse($window.localStorage[key] || def);
          }
        }
      }])


    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])

    .directive('photo-file',function($parse){
        return{
            restrict : 'A',
            link : function(scope,element,attributes){
                var set = $parse(attributes,photoFile);
                element.bind('change',function(){
                    set.assign(scope,element[0].files);
                    scope.$apply();
                });
            }
        }
    })



/*Constants regarding user login defined here*/
.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	editor : 'editor',
	guest : 'guest'
}).constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
})
/* Adding the auth interceptor here, to check every $http request*/
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})