angular.module("myApp")
    .controller("leaderesCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {

        $scope.show_data=false
        $("#resp_loader").fadeIn("slow")
        $timeout(function(){
           if(!$rootScope.token){
            toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 3000})
            $state.go("app.login")
            }else{
               $("#resp_loader").fadeOut("slow") 
               $scope.show_data=true
            } 
        },1500)

    })