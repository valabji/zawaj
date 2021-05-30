angular.module("myApp")
    .controller("usersCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st,API_URL,Auth,AUTH_EVENTS,USER_ROLES) {
 
 
      $scope.modalShown = false;
	var showLoginDialog = function() {
		if(!$scope.modalShown){
		 
		}
	};
	
	var setCurrentUser = function(){
        $scope.currentUser = $rootScope.currentUser;
        
	}
	
	var showNotAuthorized = function(){
		alert("Not Authorized");
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
	
  


    $scope.get_users=function(){
        $(".loadersmart").fadeIn("slow");
            $http.get(API_URL + "users")
            .then(function(resp){
                $scope.users = resp.data.data
                console.log($scope.users)
            }, function (e) {
            toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
        })
    }


    $scope.get_users()


       $scope.data1=[];
       $scope.data2=[];
       $scope.data3=[];
       $scope.changeRolesA=function(user_id,adding){
           console.log(adding)
           $http.post("api/changeRoles.php",{
               role:adding,
               user_id:user_id,
               whoami:"adding"
           })
           .then(function(resp){
               if(resp.data.status){
                $scope.get_users() 
                toastr.success(' تم تعديل صلاحية الاضافة ', "العملية :  إضافة صلاحية", {timeOut: 2000})
            }else{
                toastr.error('لم تم تعديل صلاحية الاضافة ', "العملية :  إضافة صلاحية", {timeOut: 2000})
               }
           }, function (e) {
            toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
        })
       }


       $scope.changeRolesD=function(user_id,del){
        $http.post("api/changeRoles.php",{
            role:del,
            user_id:user_id,
            whoami:"del"
        })
        .then(function(resp){
            if(resp.data.status){
             $scope.get_users() 
             toastr.success(' تم تعديل صلاحية الحذف ', "العملية :  إضافة صلاحية", {timeOut: 2000})
             
            }else{
                toastr.error('لم تم تعديل صلاحية الحذف ', "العملية :  إضافة صلاحية", {timeOut: 2000})
            }
        }, function (e) {
            toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
        })
    }

        $scope.changeRolesE=function(user_id,edit){
            $http.post("api/changeRoles.php",{
                role:edit,
                user_id:user_id,
                whoami:"edit"
            })
            .then(function(resp){
                if(resp.data.status){
                 $scope.get_users() 
                 toastr.success(' تم تعديل صلاحية التعديل ', "العملية :  إضافة صلاحية", {timeOut: 2000})
                 
                }else{
                    toastr.error('لم تم تعديل صلاحية التعديل ', "العملية :  إضافة صلاحية", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }
    
        $scope.add_user_md=function(){
            $("#add_user_md").modal("show");
        }

        $scope.add_user=function(){
            $http.post("api/add_user.php",{
                user_name:$scope.user_name,
                name:$scope.name,
                pass:$scope.pass
            }).then(function(resp){
                if(resp.data.status){
                    toastr.success(' تم إضافة مستخدم جديد', "العملية : إضافة مستخدم", {timeOut: 2000})
                    $scope.get_users() 
                    $("#add_user_md").modal("hide");

                    $http.post("api/active_user.php",{
                        user_name:$scope.user_name
                    }).then(function(resp){
                        if(resp.data.status)
                        {
                            toastr.warning(' تمت عملية إضافة الصلاحيات', "-", {timeOut: 3000})
                            $scope.get_users() 
                        }
                    })
                }else{
                    toastr.warning('هذا المستخدم مسجل من قبل', "-", {timeOut: 3000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }

        $scope.update_user_md=function(id,user,name){
            $scope.sname=name
            $scope.suser=user
            $scope.s_id=parseInt(id)
            $("#update_user_md").modal("show");
        }

        $scope.update_user=function(){
            $http.post("api/update_user.php",{
                id:$scope.s_id,
                name:$scope.sname,
                user:$scope.suser,
                pass:$scope.pass
            })
            .then(function(resp){
                if(resp.data.status){
                    toastr.success(' تم تعديل بيانات المستخدم', "العملية : تعديل بيانات مستخدم", {timeOut: 2000})
                    $scope.get_users() 
                    $("#update_user_md").modal("hide");

                }else{
                    toastr.error('لم يتم تعديل البيانات', "العملية : تعديل بيانات مستخدم", {timeOut: 3000})

                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }

        $scope.del_user_md=function(id){
            $("#confirm_del_user").modal("show");
            $scope.del_id=parseInt(id)
        }

        $scope.del_user=function(){
            $http.post("api/del_user.php",{
                id:$scope.del_id,
            })
            .then(function(resp){
                if(resp.data.status){
                    toastr.success(' تم حذف المستخدم', "العملية : حذف بيانات مستخدم", {timeOut: 2000})
                    $scope.get_users() 
                    $("#confirm_del_user").modal("hide");

                }else{
                    toastr.error('لم يتم حذف البيانات', "العملية : حذف بيانات مستخدم", {timeOut: 3000})

                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }

    })