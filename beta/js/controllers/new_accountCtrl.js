angular.module("myApp")
    .controller("new_accountCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {
        
        $rootScope.goUp()

        $scope.new_account=function () {
            $("#reg-loader").fadeIn("slow")
            $("#reg-btn").addClass("disabled")
            if($scope.name && $scope.email && $scope.tel && $scope.nat_id && $scope.job_addr && $scope.password){
                $("#reg-loader").fadeIn("slow")
                $("#reg-btn").addClass("disabled")
                $http.post("http://hazrh.com/ksa_api/new_account.php",{
                    name:$scope.name,
                    email:$scope.email,
                    tel:$scope.tel,
                    nat_id:$scope.nat_id,
                    job_addr:$scope.job_addr,
                    password:$scope.password
                }).then(function (resp) {
                    if(resp.data.fill){
                        if(resp.data.status){
                            toastr.success( "تم إنشاء الحساب سيتم تفعيله من قبل الادارة", {timeOut: 6000})
                            $("#reg-loader").fadeOut("slow")
                            $("#reg-btn").removeClass("disabled")
                            $state.go("app.login")
                            $rootScope.goUp()
                            $scope.name=""
                            $scope.email=""
                            $scope.tel=""
                            $scope.nat_id=""
                            $scope.job_addr=""
                            $scope.password=""
                            $scope.confirm_password=""
                         }else{
                            toastr.warning("الحساب مسجل بالفعل قم بتسجيل الدخول مباشرة", {timeOut: 2000})
                            $("#reg-loader").fadeOut("slow")
                            $("#reg-btn").removeClass("disabled")
                        }
                    }else{
                        $("#reg-loader").fadeOut("slow")
                        $("#reg-btn").removeClass("disabled")
                        toastr.error("البيانات غير مكتملة", {timeOut: 2000})
                    }

                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#reg-loader").fadeOut("slow")
                    $("#reg-btn").removeClass("disabled")
                })
                    }else {
                        $("#reg-loader").fadeOut("slow")
                        $("#reg-btn").removeClass("disabled")
                        toastr.error("البيانات غير مكتملة", {timeOut: 2000})
                    }

        }
 

     
    })