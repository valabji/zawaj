angular.module("myApp")
    .controller("profileCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {

        $(function () {
            var ms1 = $('#magicsuggest').magicSuggest({
                  data: ['الرياض','المدينة المنورة','جدة','الدمام','مكة المكرمة']
            });
        
            $("#magicsuggest input").attr("placeholder", "أرغب في الزواج من المناطق الأتية");
        
            var ms2 = $('#magicsuggest2').magicSuggest({
                data: ['كلمة دلالية 2', 'كلمة دلالية 3 ', 'كلمة دلالية 4', 'كلمة دلالية 5', 'كلمة دلالية 1']
            });
            $("#magicsuggest2 input").attr("placeholder", "أختر بعض الكلامات الدلالية");
        
              });
            
                function ChangeColor(Color)
                {
                    $('#profile-header').css("background-color", "#" + Color);
                }
        
                function Open(Link)
                {
                    window.open(Link,'_self');
                }
        
                function ShowSearchDiv()
                {
                    if($("#SearchDiv").is(":visible")){
                        $('#SearchDiv').hide('slow');
        
                        } else{
                            $('#SearchDiv').show('slow');
        
                        }
                }
        
                function SendImageModal()
                {
                    $('#SendImageModal').modal('show');
                }
        
                function ConfirmPopUp()
                {
                    $('#ConfirmModal').modal('show');
                }
        
                function ShownCheck()
                {
                    if (document.getElementById("ShownCheck").checked == true)
                    {
                        $('#ShownCheckText').text("مرئي");
                    }
                    else
                    {
                        $('#ShownCheckText').text("غير مرئي");
                    }
                }
         

        $scope.update_profile_user_info=function(user_email,user_name,user_tel,user_job_addr,user_nat_id){
            $("#update-profile-loader").fadeIn("slow")
            $("#update-profile-btn").addClass("disabled")
            
            if($rootScope.token){
                if(user_email && user_name && user_tel && user_job_addr && user_nat_id){
                   $http.post('http://hazrh.com/ksa_api/update_profile_user_info.php',{
                       user_email:user_email,
                       user_name:user_name,
                       user_tel:user_tel,
                       user_job_addr:user_job_addr,
                       user_nat_id:user_nat_id,
                       token:$rootScope.token,
                       user_id:parseInt($rootScope.user_id)
                   }).then(function(resp){
                       if(resp.data.fill_token){
                            if(resp.data.fill){
                                if(resp.data.status){
                                    toastr.success('تم تعديل الملف الشخصي', {timeOut: 2000})
                                    $("#update-profile-loader").fadeOut("slow")
                                    $("#update-profile-btn").removeClass("disabled")    
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
                                    $state.reload();
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
                                                $state.go("app.home")
                                                $rootScope.role_adding=resp.data.role_adding
                                                $rootScope.role_update=resp.data.role_update
                                            }
                                        })
                                    }
                                }else{
                                    toastr.warning('لم يتم تعديل الملف الشخصي', {timeOut: 2000})
                                    $("#update-profile-loader").fadeOut("slow")
                                    $("#update-profile-btn").removeClass("disabled")
                                }
                            }else{
                                toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                                $("#update-profile-loader").fadeOut("slow")
                                $("#update-profile-btn").removeClass("disabled")
                            }
                       }else{
                        toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                        $state.go("app.login")
                        $("#update-profile-loader").fadeOut("slow")
                        $("#update-profile-btn").removeClass("disabled")
                       }

                   },function(e){
                        toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                        $("#update-profile-loader").fadeOut("slow")
                        $("#update-profile-btn").removeClass("disabled")
                   })
                }else{
                    toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                    $("#update-profile-loader").fadeOut("slow")
                    $("#update-profile-btn").removeClass("disabled")
                }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#update-profile-loader").fadeOut("slow")
                $("#update-profile-btn").removeClass("disabled")
            }
        }
















        $scope.update_profile_user_pass=function(){
            $("#update-profile-pass-loader").fadeIn("slow")
            $("#update-profile-pass-btn").addClass("disabled")
            
            if($rootScope.token){
                if($scope.old_password && $scope.new_password && $scope.confirm_password){
                   $http.post('http://hazrh.com/ksa_api/update_profile_user_pass.php',{
                       old_password:$scope.old_password,
                       new_password:$scope.new_password,
                       confirm_password:$scope.confirm_password,
                       token:$rootScope.token,
                       user_id:parseInt($rootScope.user_id)
                   }).then(function(resp){
                       if(resp.data.fill_token){
                            if(resp.data.fill){
                                if(resp.data.check_password){
                                    if(resp.data.status){
                                        toastr.success('تم تعديل كلمة المرور ', {timeOut: 2000})
                                        $("#update-profile-pass-loader").fadeOut("slow")
                                        $("#update-profile-pass-btn").removeClass("disabled")    
                                        sessionStorage.setItem("token",resp.data.token)
                                        sessionStorage.setItem("email",resp.data.email)
                                        $rootScope.user_id=resp.data.id
                                        $rootScope.user_type=resp.data.user_type
                                        $rootScope.user_email=resp.data.email
                                        $rootScope.status_user=resp.data.status_user
                                        $rootScope.user_name=resp.data.name
                                        $rootScope.token=resp.data.token
                                        $rootScope.user_job_addr=resp.data.job_addr
                                        $rootScope.user_nat_id=resp.data.nat_id
                                        $rootScope.user_tel=resp.data.tel
                                        $state.reload();
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
    
                                        
                                        if(resp.data.user_type=='admin'){
                                            $http.post("http://hazrh.com/ksa_api/role_user.php",{
                                                id:parseInt($rootScope.user_id)
                                            }).then(function(resp){
                                                if(resp.data.status){
                                                    $rootScope.logined=true 
                                                    $rootScope.role_adding=resp.data.adding
                                                    $rootScope.role_edit=resp.data.edit
                                                    $rootScope.role_del=resp.data.del
                                                }
                                            })
                                        }
                                    }else{
                                        toastr.warning('لم يتم تعديل كلمة المرور', {timeOut: 2000})
                                        $("#update-profile-pass-loader").fadeOut("slow")
                                        $("#update-profile-pass-btn").removeClass("disabled")  
                                    }
                                }else{
                                    toastr.warning('كلمة المرور التي أدخلتها خاطئة , حاول مره اخرى .', {timeOut: 5000})
                                    $("#update-profile-pass-loader").fadeOut("slow")
                                    $("#update-profile-pass-btn").removeClass("disabled")  
                                }
                                
                            }else{
                                toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                                $("#update-profile-pass-loader").fadeOut("slow")
                                $("#update-profile-pass-btn").removeClass("disabled")  
                            }
                       }else{
                        toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                        $state.go("app.login")
                        $("#update-profile-pass-loader").fadeOut("slow")
                        $("#update-profile-pass-btn").removeClass("disabled")  
                       }

                   },function(e){
                        toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                        $("#update-profile-pass-loader").fadeOut("slow")
                        $("#update-profile-pass-btn").removeClass("disabled")  
                   })
                }else{
                    toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                    $("#update-profile-pass-loader").fadeOut("slow")
                    $("#update-profile-pass-btn").removeClass("disabled")  
                }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#update-profile-pass-loader").fadeOut("slow")
                $("#update-profile-pass-btn").removeClass("disabled")  
            }
        }
        
        
        $scope.fetch_total_num_info=function(){
            if($rootScope.token){
                $http.post("http://hazrh.com/ksa_api/fetch_total_num_info.php",{
                token:$rootScope.token,
                user_id:parseInt($rootScope.user_id)
                 }).then(function(resp){
                    if(resp.data){
                        $scope.total_users=resp.data[0].total_users
                        
                        $scope.total_in=parseInt(resp.data[1].last_month_amount)
                        $scope.total_subscriptions_info=parseInt(resp.data[2].total_subscriptions)
                        $scope.total_cach_in=$scope.total_in + $scope.total_subscriptions
                        if(resp.data[2].total_subscriptions==null){
                            $scope.total_subscriptions_info="لا يوجد سداد اشتراكات"
                        }
                        $scope.total_out_info=parseInt(resp.data[3].total_out)
                        if(resp.data[3].total_out==null){
                            $scope.total_out_info="لا توجد سلفيات"
                        }
                        $scope.total_out_group=parseInt(resp.data[4].total_out_group)
                        $scope.total_cach_out=$scope.total_out + $scope.total_out_group
                        $scope.show_data=true
                        $("#resp_users_info").fadeOut("slow")
                        $("#resp_users_info2").fadeOut("slow")
                    }else{
                        $("#resp_users_info").fadeOut("slow")
                        $("#resp_users_info2").fadeOut("slow") 
                    }
                    }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    })
                }else{
                toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
            }
        }
        
      
    
    })