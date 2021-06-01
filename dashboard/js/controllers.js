
angular.module("myApp")
    .controller("appCtrl",function ($scope,$rootScope,$http,$timeout,$uibModal,$state,$st,Auth,API_URL) {

        $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

            if(!value && oldValue) {
              console.log("Disconnect");
              $state.go('app.login');
            }
        
            if(value) {
              console.log("Connect");
              //Do something when the user is connected
            }
        
        }, true);
        

        // $("#LoginModal").modal("show")

          $scope.GetSocial = function() {
              $http.get(API_URL+"settings").then(function(resp){
                  if(resp.data.success){
                      $scope.facebook = resp.data.data[0].value
                      $scope.twitter = resp.data.data[1].value
                  }
              })
          }

          $scope.GetSocial()
         
         
  $rootScope.reLogin=function(){
            if(sessionStorage.getItem("token")!== null){
            $http.post("http://hazrh.com/ksa_api/check_login.php",{
                token:sessionStorage.getItem("token"),
                email:sessionStorage.getItem("email")
            }).then(function(resp){
               if(resp.data.status){
                    $("#sing-in").fadeIn("slow")
                    $("#login-loader").fadeOut("slow")
                    $("#login-btn").removeClass("disabled")
                        sessionStorage.setItem("token",resp.data.token)
                        sessionStorage.setItem("email",resp.data.email)
                        sessionStorage.setItem("id",resp.data.id)
                        
                        sessionStorage.setItem("user_type",resp.data.user_type)
                        sessionStorage.setItem("status_user",resp.data.status_user)
                        sessionStorage.setItem("user_job_addr",resp.data.job_addr)
                        sessionStorage.setItem("user_nat_id",resp.data.nat_id)
                        sessionStorage.setItem("user_tel",resp.data.tel)
                        
                        $rootScope.user_id=sessionStorage.getItem("id")
                        $rootScope.user_type=sessionStorage.getItem("user_type")
                        $rootScope.user_email=sessionStorage.getItem("email")
                        $rootScope.status_user=sessionStorage.getItem("status_user")
                        $rootScope.user_name=resp.data.name
                        $rootScope.token=sessionStorage.getItem("token")
                        $rootScope.user_job_addr=sessionStorage.getItem("user_job_addr")
                        $rootScope.user_nat_id=sessionStorage.getItem("user_nat_id")
                        $rootScope.user_tel=sessionStorage.getItem("user_tel")
    
                    if(resp.data.user_type=='user'){
                        if(resp.data.status_user=="0"){
                            toastr.info("لم يتم تفعيل حسابك , الرجاء الانتظار او التواصل مع الادارة .", {timeOut: 3000})
                            $("#sing-in").fadeIn("slow")
                            $("#login-loader").fadeOut("slow")
                            $("#login-btn").removeClass("disabled")
                            $rootScope.logined=false 
                        }else if(resp.data.status_user=="1"){
                            $("#sing-in").fadeIn("slow")
                            $("#login-loader").fadeOut("slow")
                            $("#login-btn").removeClass("disabled")
                            $rootScope.logined=true 
                        }else if(resp.data.status_user=="2"){
                            toastr.warning("حسابك غير نشط الرجاء التواصل مع إدارة الموقع .", {timeOut: 3000})
                            $("#sing-in").fadeIn("slow")
                            $("#login-loader").fadeOut("slow")
                            $("#login-btn").removeClass("disabled")
                            $rootScope.logined=false 
                        }
                    }
    
                    
                    if(resp.data.user_type=='admin' || resp.data.user_type=='team' || resp.data.user_type=='control'){
                        $http.post("http://hazrh.com/ksa_api/role_user.php",{
                            id:parseInt($rootScope.user_id)
                        }).then(function(resp){
                            if(resp.data.status){
                                $rootScope.logined=true 
                               
                                $rootScope.role_adding=resp.data.role_adding
                                $rootScope.role_update=resp.data.role_update
                            }
                        })
                    }
    
    
                }else{
                     $state.go("app.home")
                    $("#sing-in").fadeIn("slow")
                    $("#login-loader").fadeOut("slow")
                    $("#login-btn").removeClass("disabled")
                }
        }, function (e) {
            toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            $(".login-load").fadeOut("fast")
            $("#btn-login").removeClass("disabled")
        })
        

        }else{
           return false;
        }
        }
        
         

        
        $rootScope.logout=function(){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('status_user');
            sessionStorage.removeItem('user_job_addr');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('user_nat_id');
            sessionStorage.removeItem('user_type');
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('user_tel');
             
            $state.go("app.home");
            $rootScope.logined=false
            $rootScope.user_id=""
            $rootScope.status_user=""
            $rootScope.user_job_addr=""
            $rootScope.email=""
            $rootScope.user_nat_id=""
            $rootScope.user_type=""
            $rootScope.token=""
            $rootScope.user_id=""
        }
        $rootScope.goUp=function () {
            $("html,body").animate({scrollTop: '0px'}, 0);
        }

        $scope.collapse=function () {
            $("#navbarNav").slideToggle("fast")
        }

        $scope.decollapse=function () {
            $("#navbarNav").slideUp("fast")
        }




    })

    
