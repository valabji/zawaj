angular.module("myApp")
    .controller("subscriptionsCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {
        
        $scope.prepare=function () {
            $scope.x=document.getElementById("file").files[0];
            var reader = new FileReader();
    
            reader.onload = function(event) {
                $scope.img_src = event.target.result
                var fileInput =  document.getElementById('file'); 
                var filePath = fileInput.value; 
                var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; 
                if (!allowedExtensions.exec(filePath)) { 
                        toastr.warning('الملفات المسموح بها هي jpg , jpeg , png', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                        fileInput.value = ''; 
                        $scope.upload_subscriptions=false
                     }else{
                        $scope.upload_subscriptions=true
                    }  
                
                $scope.$apply(function($scope) {
                });
            }
            reader.readAsDataURL($scope.x)
        
        }
            
        $scope.prepareTarget2=function () {
            $scope.target2=document.getElementById("target2").files[0];
            var reader = new FileReader();
    
            reader.onload = function(event) {
                $scope.img_src1 = event.target.result
                 var fileInput =  document.getElementById('target2'); 
                var filePath = fileInput.value; 
                var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; 
                if (!allowedExtensions.exec(filePath)) { 
                        toastr.warning('الملفات المسموح بها هي jpg , jpeg , png', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                        fileInput.value = ''; 
                        $scope.upload_add_last_loan=false
                     }else{
                        $scope.upload_add_last_loan=true
                    }
                $scope.$apply(function($scope) {
                });
            }
            reader.readAsDataURL($scope.target2)
    
        }
        
        $scope.getLastLoan=function(){
            if($rootScope.token){
                $("#resp_loader3").fadeIn("slow")
                $http.post("http://hazrh.com/ksa_api/fetch_last_loan_user.php",{
                user_id:$rootScope.user_id,
                token:$rootScope.token
                 }).then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                                $scope.fill_loan_id=resp.data[0]
                                $scope.fill_month_amount=resp.data[1]
                                $scope.fill_amount=resp.data[2]
                            if($scope.fill_loan_id !== null && $scope.fill_month_amount !== null && $scope.fill_amount !== null){
                                $scope.fill_loan_id=parseInt(resp.data[0])
                                $scope.fill_month_amount=parseInt(resp.data[1])
                                $scope.fill_amount=parseInt(resp.data[2])
                                $scope.tab="target2"
                            }else{
                                $scope.tab="target1"
                                toastr.warning('لا يوجد لديك سلفيات لسدادها', {timeOut: 2000})
                            }
                            
                        }else{
                            $scope.tab="target1"
                            toastr.warning('لا يوجد لديك سلفيات لسدادها', {timeOut: 2000})
                        }
                    }else{
                        toastr.error('البيانات غير مكتملة', {timeOut: 2000})
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
            
            
            
        $scope.expanded = false;
        
        $scope.showCheckboxes =function() {
          $scope.checkboxes = document.getElementById("checkboxes");
          if (!$scope.expanded) {
            $scope.checkboxes.style.display = "block";
            $scope.expanded = true;
          } else {
            $scope.checkboxes.style.display = "none";
            $scope.expanded = false;
          }
        }
        
        $scope.month_num=[]
 
        $scope.setValue=function(value,id){
           if(value){
               if ($(id).is(':checked')) {
                    $scope.month_num.push({month_num:value})            
                } else {
                     var index = $scope.month_num.indexOf(value)
                    $scope.month_num.splice(index, 1);                  
                }
                
           }
        }
        
 
    	         
        
          $scope.add_last_loan=function(){
            $("#add_last_loan-loader").fadeIn("slow")
            $("#add_last_loan-btn").addClass("disabled")
            if($rootScope.token){
               if($scope.fill_loan_id && $scope.fill_month_amount ){
                    if($scope.upload_add_last_loan){
                        if($scope.target2){
                $http({
                method: 'POST',
                url: "http://hazrh.com/ksa_api/add_last_loan.php",
                processData: false,
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("z", $scope.target2)
                    formData.append("fill_loan_id", $scope.fill_loan_id)
                    formData.append("fill_month_amount", $scope.fill_month_amount)
                    formData.append("user_id", $rootScope.user_id)
                    formData.append("token", $rootScope.token)
                    return formData;
                    },
                    data: $scope.name,
                    headers: {
                        'Content-Type': undefined
                    }
                     }).then(function(resp){
                    if(resp.data.fill){
                       if(resp.data.status){
                        $scope.fill_loan_id=""
                        $scope.fill_month_amount=""
                        $scope.tab="target1"
                        $scope.target2=""
                        $scope.img_src1=""
                        toastr.success("تم ارسال سداد الاشتراك وسيتم مراجعه طلب وابلاغك بقبوله او رفضه", {timeOut: 6000})
                        $state.go("app.orders")
                        $("#add_last_loan-loader").fadeOut("slow")
                        $("#add_last_loan-btn").removeClass("disabled")
                       }else{
                        toastr.error('لم يتم ارسال السداد الرجاء المحاوله مره اخرى !!', {timeOut: 2000})
                        $("#add_last_loan-loader").fadeOut("slow")
                        $("#add_last_loan-btn").removeClass("disabled")
                       }
                    }else{
                        toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                        $("#add_last_loan-loader").fadeOut("slow")
                        $("#add_last_loan-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#add_last_loan-loader").fadeOut("slow")
                    $("#add_last_loan-btn").removeClass("disabled")
                })
                    }else{
                        toastr.warning('الرجاء ارفاق مستند السداد', {timeOut: 2000})
                        $("#add_last_loan-loader").fadeOut("slow")
                        $("#add_last_loan-btn").removeClass("disabled")
                    }
                    }else{
                        toastr.warning('الرجاء ارفاق مستند السداد', {timeOut: 2000})
                        $("#add_last_loan-loader").fadeOut("slow")
                        $("#add_last_loan-btn").removeClass("disabled")
                    }
               }else{
                toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                $("#add_last_loan-loader").fadeOut("slow")
                $("#add_last_loan-btn").removeClass("disabled")
               }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#add_last_loan-loader").fadeOut("slow")
                $("#add_last_loan-btn").removeClass("disabled")
            }
        }
        
       
        
        
        $scope.add_subscriptions=function(){
            $("#subscriptions-loader").fadeIn("slow")
            $("#subscriptions-btn").addClass("disabled")
            if($rootScope.token){
               if($scope.year && $scope.month_num && $scope.month_amount){
                if($scope.upload_subscriptions){
                    if($scope.x){
                $http({
                method: 'POST',
                url: "http://hazrh.com/ksa_api/add_subscriptions.php",
                processData: false,
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("file", $scope.x)
                    formData.append("year", $scope.year)
                    formData.append("month_num",JSON.stringify($scope.month_num))
                    formData.append("month_amount", $scope.month_amount)
                    formData.append("user_id", $rootScope.user_id)
                    formData.append("token", $rootScope.token)
                    return formData;
                    },
                    data: $scope.name,
                    headers: {
                        'Content-Type': undefined
                    }
                     }).then(function(resp){
                     if(resp.data.fill){
                       if(resp.data.status){
                        $scope.year=""
                        $scope.month_num=[]
                        $scope.month_amount=""
                        toastr.success("تم ارسال سداد الاشتراك وسيتم مراجعه طلب وابلاغك بقبوله او رفضه", {timeOut: 6000})
                        $state.go("app.orders") 
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                       }else{
                         
                        toastr.warning('لم يتم ارسال السداد حاول مرة اخرى', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                       }
                    }else{
                         toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#subscriptions-loader").fadeOut("slow")
                    $("#subscriptions-btn").removeClass("disabled")
                })
                    }else{
                        toastr.warning('الرجاء ارفاق مستند السداد', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                    }
                }else{
                        toastr.warning('الرجاء ارفاق مستند السداد', {timeOut: 2000})
                        $("#subscriptions-loader").fadeOut("slow")
                        $("#subscriptions-btn").removeClass("disabled")
                    }
               }else{
                toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                $("#subscriptions-loader").fadeOut("slow")
                $("#subscriptions-btn").removeClass("disabled")
               }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#subscriptions-loader").fadeOut("slow")
                $("#subscriptions-btn").removeClass("disabled")
            }
        }
        

       

        
 

    })