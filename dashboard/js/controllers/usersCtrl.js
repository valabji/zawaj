angular.module("myApp")
    .controller("usersCtrl",function ($scope,$rootScope,$http,$state,$timeout,$ModalService,API_URL,Auth,AUTH_EVENTS,USER_ROLES) {
 
 
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
            
        $scope.ViewUser = function (user, ModalName) {
            $scope.fullname = user.fullname
            $scope.email = user.email
            $scope.country = user.country
            $scope.passport_id = user.passport_id
            $scope.passport_expire = user.passport_expire
            $scope.height = user.height
            $scope.weight = user.weight
            $scope.race = user.race
            $scope.race2 = user.race2
            $scope.race3 = user.race3
            $scope.education = user.education
            $scope.employee = user.employee
            $scope.skin_color = user.skin_color
            $scope.religion = user.religion
            $scope.smoker = user.smoker
            $scope.finance = user.finance
            $scope.finance_alt = user.finance_alt
            $scope.body_shape = user.body_shape
            $scope.location_ftr_mrg = user.location_ftr_mrg
            $scope.marriage_type = user.marriage_type
            $scope.characteristic_of_marriage = user.characteristic_of_marriage
            $scope.mult_marriage = user.mult_marriage
            $scope.num_sone = user.num_sone
            $scope.phone = user.phone
            $scope.self_bio = user.self_bio
            $scope.part_bio = user.part_bio
            $ModalService.OpenModal(ModalName)
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