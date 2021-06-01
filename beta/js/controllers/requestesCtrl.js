angular.module("myApp")
    .controller("ContactCtrl",function ($scope,$rootScope,$http,$state,$timeout,$filter) {
         

        $scope.add_order_loan=function(){
            $("#loan-loader").fadeIn("slow")
            $("#loan-btn").addClass("disabled")
            if($rootScope.token){
               if($scope.amount && $scope.month_paymant && $scope.month_amount && $scope.descr){
                $http.post("http://hazrh.com/ksa_api/add_order_loan_user.php",{
                    amount:$scope.amount,
                    month_paymant:$scope.month_paymant,
                    month_amount:$scope.month_amount,
                    descr:$scope.descr,
                    token:$rootScope.token,
                    user_id:$rootScope.user_id
                })
                .then(function(resp){
                    if(resp.data.fill){
                       if(resp.data.status){
                        $scope.descr=""
                        $scope.month_amount=""
                        $scope.month_paymant=""
                        $scope.amount=""
                        toastr.success("تم تقديم الطلب للأدارة الرجاء انتظار الموافقه في قائمة الطلبات .   ", {timeOut: 7000})
                        $("#loan-loader").fadeOut("slow")
                        $("#loan-btn").removeClass("disabled")
                        $state.go("app.orderes")
                       }else{
                        toastr.error('لم يتم تقديم الطلب !!', {timeOut: 2000})
                        $("#loan-loader").fadeOut("slow")
                        $("#loan-btn").removeClass("disabled")
                       }
                    }else{
                        toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                        $("#loan-loader").fadeOut("slow")
                        $("#loan-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#loan-loader").fadeOut("slow")
                    $("#loan-btn").removeClass("disabled")
                })
               }else{
                toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                $("#loan-loader").fadeOut("slow")
                $("#loan-btn").removeClass("disabled")
               }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#loan-loader").fadeOut("slow")
                $("#loan-btn").removeClass("disabled")
            }
        }


    })    