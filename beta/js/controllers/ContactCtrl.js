angular.module("myApp")
    .controller("ContactCtrl",function ($scope,$rootScope,$http,$state,$timeout,$filter) {
         

        $scope.Send=function(){
            $("#loan-loader").fadeIn("slow")
            $("#loan-btn").addClass("disabled")
                var fd = new FormData();
                fd.append('name',$scope.name)
                fd.append('email',$scope.email)
                fd.append('phone',$scope.phone)
                fd.append('messege',$scope.messege)

               if($scope.name && $scope.email && $scope.phone && $scope.messege){
                $http.post("http://hazrh.com/ksa_api/add_order_loan_user.php",fd,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                    .then(function(resp){
                    if(resp.data.success){
                       if(resp.data.status){
                        $scope.name=""
                        $scope.email=""
                        $scope.phone=""
                        $scope.messege=""
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
        }


    })    