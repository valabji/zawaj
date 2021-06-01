angular.module("myApp")
    .controller("orderesCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {

     
        $scope.fetch_order_loan_user=function(){
            if($rootScope.token){
                $("#resp_loader").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_order_loan_user.php",{
                user_id:$rootScope.user_id,
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                        $scope.order_loan=resp.data
                        $("#resp_loader").fadeOut("slow")
                    }else{
                        $("#resp_loader").fadeOut("slow") 
                        // $("#null_order").fadeIn("slow") 
                        // $("#get_order").fadeIn("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#resp_loader").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#resp_loader").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
           $scope.fetch_subscriptions_user=function(){
            if($rootScope.token){
                $("#resp_loader3").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_subscriptions_user.php",{
                user_id:$rootScope.user_id,
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                         resp.data.forEach(function(i){
                         i.month_num=JSON.parse(i.month_num)
                      })
                        $scope.subscriptions=resp.data
                        $("#resp_loader3").fadeOut("slow")
                    }else{
                        $("#resp_loader3").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#resp_loader3").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#resp_loader3").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        $scope.fetch_last_loan_user=function(){
            if($rootScope.token){
                $("#resp_loader2").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_last_loan_user2.php",{
                user_id:$rootScope.user_id,
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                        $scope.add_last=resp.data
                        $("#resp_loader2").fadeOut("slow")
                    }else{
                        $("#resp_loader2").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#resp_loader2").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#resp_loader2").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
         $scope.fetch_order_loan_admin=function(){
            if($rootScope.token){
                $("#fetch_order_loan_admin").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_order_loan_admin.php",{
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                        $scope.order_loan_admin=resp.data
                        $("#fetch_order_loan_admin").fadeOut("slow")
                    }else{
                        $("#fetch_order_loan_admin").fadeOut("slow") 
                        // $("#null_order").fadeIn("slow") 
                        // $("#get_order").fadeIn("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#fetch_order_loan_admin").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#fetch_order_loan_admin").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        $scope.update_order_loan_md=function(id,order_loan_status){
            $("#update_order_loan_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.order_loan_status=parseInt(order_loan_status)
            $scope.order_loan_id=parseInt(id)
        }
        
        
        $scope.update_order_loan=function(){
            if($rootScope.token){
                $(".update_order_loan").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/update_order_loan.php",{
                token:$rootScope.token,
                user_type:$rootScope.user_type,
                user_id:$rootScope.user_id,
                order_loan_id:$scope.order_loan_id,
                reson:$scope.reson,
                order_loan_status:$scope.order_loan_status
                 }).then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $scope.fetch_order_loan_admin()
                            $scope.order_loan_status=""
                            $scope.reson=""
                            $("#update_order_loan_md").modal("hide")
                            $(".update_order_loan").fadeOut("slow")
                            toastr.success('تمت العملية بنجاح', {timeOut: 2000})
                            $(".update_order_loan").fadeOut("slow") 
                        }else{
                            $(".update_order_loan").fadeOut("slow") 
                        }
                    }else{
                        toastr.error('البيانات غير مكتملة !!', {timeOut: 2000})
                        $(".update_order_loan").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $(".update_order_loan").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $(".update_order_loan").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        
        $scope.fetch_last_loan_admin=function(){
            if($rootScope.token){
                $("#fetch_order_loan_admin").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_last_loan_admin.php",{
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                        $scope.last_loan_admin=resp.data
                        $("#fetch_order_loan_admin").fadeOut("slow")
                    }else{
                        $("#fetch_order_loan_admin").fadeOut("slow") 
                        // $("#null_order").fadeIn("slow") 
                        // $("#get_order").fadeIn("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#fetch_order_loan_admin").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#fetch_order_loan_admin").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        $scope.update_last_loan_md=function(id,order_loan_status){
            $("#update_last_loan_md").modal("show")
            $scope.order_loan_status=parseInt(order_loan_status)
            $scope.order_loan_id=parseInt(id)
        }
        
        
        $scope.update_last_loan=function(){
            if($rootScope.token){
                $(".update_order_loan").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/update_last_loan.php",{
                token:$rootScope.token,
                user_type:$rootScope.user_type,
                user_id:$rootScope.user_id,
                order_loan_id:$scope.order_loan_id,
                reson:$scope.reson,
                order_loan_status:$scope.order_loan_status
                 }).then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $scope.fetch_last_loan_admin()
                            $scope.order_loan_status=""
                            $scope.reson=""
                            $("#update_last_loan_md").modal("hide")
                            $(".update_order_loan").fadeOut("slow")
                            toastr.success('تمت العملية بنجاح', {timeOut: 2000})
                            $(".update_order_loan").fadeOut("slow") 
                        }else{
                            $(".update_order_loan").fadeOut("slow") 
                        }
                    }else{
                        toastr.error('البيانات غير مكتملة !!', {timeOut: 2000})
                        $(".update_order_loan").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $(".update_order_loan").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $(".update_order_loan").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        $scope.fetch_subscriptions_admin=function(){
            if($rootScope.token){
                $("#resp_loader3").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_subscriptions_admin.php",{
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                         resp.data.forEach(function(i){
                         i.month_num=JSON.parse(i.month_num)
                      })
                        $scope.subscriptions_admin=resp.data
                        $("#resp_loader3").fadeOut("slow")
                    }else{
                        $("#resp_loader3").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#resp_loader3").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#resp_loader3").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        $scope.update_subscriptions_admin_md=function(id,order_loan_status){
            $("#update_subscriptions_admin_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.order_loan_status=parseInt(order_loan_status)
            $scope.order_loan_id=parseInt(id)
        }
        
        
        $scope.update_subscriptions_admin=function(){
            if($rootScope.token){
                $(".update_order_loan").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/update_subscriptions_admin.php",{
                token:$rootScope.token,
                user_type:$rootScope.user_type,
                user_id:$rootScope.user_id,
                order_loan_id:$scope.order_loan_id,
                reson:$scope.reson,
                order_loan_status:$scope.order_loan_status
                 }).then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $scope.fetch_subscriptions_admin()
                            $scope.order_loan_status=""
                            $scope.reson=""
                            $("#update_subscriptions_admin_md").modal("hide")
                            $(".update_order_loan").fadeOut("slow")
                            toastr.success('تمت العملية بنجاح', {timeOut: 2000})
                            $(".update_order_loan").fadeOut("slow") 
                        }else{
                            $(".update_order_loan").fadeOut("slow") 
                        }
                    }else{
                        toastr.error('البيانات غير مكتملة !!', {timeOut: 2000})
                        $(".update_order_loan").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $(".update_order_loan").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $(".update_order_loan").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
         $scope.fetch_outgoing_admin=function(){
            if($rootScope.token){
                $("#resp_loader").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_outgoing.php",{
                user_id:$rootScope.user_id,
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data){
                        $scope.outgoing_admin=resp.data
                        $("#resp_loader").fadeOut("slow")
                    }else{
                        $("#resp_loader").fadeOut("slow") 
                        // $("#null_order").fadeIn("slow") 
                        // $("#get_order").fadeIn("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#resp_loader").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $("#resp_loader").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        $scope.update_outgoing_admin_md=function(id,order_loan_status){
            $("#update_outgoing_admin_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.order_loan_status=parseInt(order_loan_status)
            $scope.order_loan_id=parseInt(id)
        }
        
        $scope.update_outgoing_admin=function(){
            if($rootScope.token){
                $(".update_order_loan").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/update_outgoing_admin.php",{
                token:$rootScope.token,
                user_type:$rootScope.user_type,
                user_id:$rootScope.user_id,
                order_loan_id:$scope.order_loan_id,
                reson:$scope.reson,
                order_loan_status:$scope.order_loan_status
                 }).then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $scope.fetch_outgoing_admin()
                            $scope.order_loan_status=""
                            $scope.reson=""
                            $("#update_outgoing_admin_md").modal("hide")
                            $(".update_order_loan").fadeOut("slow")
                            toastr.success('تمت العملية بنجاح', {timeOut: 2000})
                            $(".update_order_loan").fadeOut("slow") 
                        }else{
                            $(".update_order_loan").fadeOut("slow") 
                        }
                    }else{
                        toastr.error('البيانات غير مكتملة !!', {timeOut: 2000})
                        $(".update_order_loan").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $(".update_order_loan").fadeOut("slow")
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $(".update_order_loan").fadeOut("slow")
                $state.go("app.login")
            }
        }
        
        
        
        
        

       
           
                $timeout(function(){
                   if(!$rootScope.token){
                    toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 3000})
                    $state.go("app.login")
                    }else{
                        
                            $scope.fetch_order_loan_user()
                   
                            $scope.fetch_order_loan_admin()
                         
                         $("#fetch_order_loan_admin").fadeOut("slow")
                    } 
                },2000)

    })