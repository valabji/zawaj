angular.module("myApp")
    .controller("outgoingCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {

        
      
        

        $scope.get_outgoing_type=function(){
            $("#resp_loader").fadeIn("slow")
            $http.get("http://hazrh.com/ksa_api/fetch_outgoing_type.php").then(function(resp){
                if(resp.data){
                    $scope.outgoing_type=resp.data
                    $("#resp_loader").fadeOut("slow")
                }else{
                    $("#resp_loader").fadeOut("slow") 
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                $("#resp_loader").fadeOut("slow")
            })
        }
        $scope.show_data=false
        $timeout(function(){
          if(!$rootScope.token){
            toastr.error('الرجاء تسجيل الدخول اولا !!', {timeOut: 3000})
            $state.go("app.login")
            }else{
              if($rootScope.user_type == 'team' || $rootScope.user_type == 'user' ){
                    toastr.error('غير مصرح بالدخول', {timeOut: 3000})
                    $state.go("app.home")
                    $scope.show_data=false
                }else{
                    $scope.show_data=true
                    $scope.get_outgoing_type()
                    $scope.get_outgoing()
                }
            } 
        },1500)

        $scope.get_outgoing_type()
        

        $scope.openModel=function(ModelName){
            $(ModelName).modal({
                    backdrop:false,
                    show:true
                })
        }

        $scope.del_cat_md=function(id,cat_name){
            $("#confirm_del_cat").modal({
                    backdrop:false,
                    show:true
                })
            $scope.cat_id=parseInt(id)
            $scope.select_name=cat_name
        }

        
        $scope.del=function(){
            $http.post("api/del_cat.php",{
                id:$scope.cat_id,
                user:$rootScope.username
            })
            .then(function(resp){
                if(resp.data.status){
                    $("#confirm_del_cat").modal("hide")
                    $scope.get_catt()
                    toastr.success(' تم حذف القسم', "العملية : حذف بيانات قسم", {timeOut: 2000})
                }else{
                    toastr.error('لم يتم حذف القسم', "العملية : حذف بيانات قسم", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }


        $scope.add_outgoing_type=function(){
            $("#outgoing-loader").fadeIn("slow")
            $("#outgoing-btn").addClass("disabled")
            if($rootScope.token){
               if($scope.outgoing_type1 && $scope.up && $scope.down){
                $http.post("http://hazrh.com/ksa_api/add_outgoing_type.php",{
                    outgoing_type:$scope.outgoing_type1,
                    up:$scope.up,
                    down:$scope.down,
                    token:$rootScope.token,
                    user_id:$rootScope.user_id
                })
                .then(function(resp){
                    if(resp.data.fill){
                       if(resp.data.status){
                        $("#add_outgoing_type").modal("hide")
                        $scope.outgoing_type=""
                        $scope.up=""
                        $scope.down=""
                        $scope.get_outgoing_type()
                        toastr.success("تم إضافة نوع منصرف جديد", {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                       }else{
                        toastr.error('لم يتم إضافة نوع منصرف !!', {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                       }
                    }else{
                        toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#outgoing-loader").fadeOut("slow")
                    $("#outgoing-btn").removeClass("disabled")
                })
               }else{
                toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                $("#outgoing-loader").fadeOut("slow")
                $("#outgoing-btn").removeClass("disabled")
               }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#outgoing-loader").fadeOut("slow")
                $("#outgoing-btn").removeClass("disabled")
                $("#add_outgoing_type").modal("hide")
            }
        }
        

        $scope.update_outgoing_type_md=function(outgoing_type,up,down,id){
            $("#update_outgoing_type_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.outgoing_type_selected=outgoing_type
            $scope.up_selected=parseFloat(up)
            $scope.down_selected=parseInt(down)
            $scope.outgoing_type_id=parseInt(id)
        }

        $scope.update_outgoing_type=function(){
            $("#outgoing-update-loader").fadeIn("slow")
            $("#outgoing-update-btn").addClass("disabled")
            if($rootScope.token){
                $http.post("http://hazrh.com/ksa_api/update_outgoing_type.php",{
                    outgoing_type_id:$scope.outgoing_type_id,
                    outgoing_type:$scope.outgoing_type_selected,
                    up:$scope.up_selected,
                    down:$scope.down_selected,
                    user_id:$rootScope.user_id,
                    token:$rootScope.token
                })
                .then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $("#update_outgoing_type_md").modal("hide")
                            $scope.up_selected=""
                            $scope.down_selected=""
                            $scope.outgoing_type_selected=""
                            $scope.outgoing_type_id=""
                            $scope.get_outgoing_type()
                            toastr.success("تم تعديل البيانات بنجاح", {timeOut: 2000})
                            $("#outgoing-update-loader").fadeOut("slow")
                            $("#outgoing-update-btn").removeClass("disabled")
                        }else{
                            toastr.error("لم يتم تعديل البيانات !!", {timeOut: 2000})
                            $("#outgoing-update-loader").fadeOut("slow")
                            $("#outgoing-update-btn").removeClass("disabled")
                        }
                    }else{
                        toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                        $("#outgoing-update-loader").fadeOut("slow")
                        $("#outgoing-update-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#outgoing-update-loader").fadeOut("slow")
                    $("#outgoing-update-btn").removeClass("disabled")
                })
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#outgoing-update-loader").fadeOut("slow")
                $("#outgoing-update-btn").removeClass("disabled")
                $("#update_outgoing_type_md").modal("hide")
            }
        }



        //الادارة

        $scope.get_outgoing=function(){
            $("#resp_loader").fadeIn("slow")
            $http.get("http://hazrh.com/ksa_api/fetch_outgoing.php").then(function(resp){
                if(resp.data){
                    $scope.outgoing=resp.data
                    $("#resp_loader").fadeOut("slow")
                }else{
                    $("#resp_loader").fadeOut("slow") 
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                $("#resp_loader").fadeOut("slow")
            })
        }

        







        $scope.add_outgoing=function(){
            $("#outgoing-loader").fadeIn("slow")
            $("#outgoing-btn").addClass("disabled")
            if($rootScope.token){
               if($scope.outgoing_plus && $scope.reserver_name && $scope.amount && $scope.descr){
                $http.post("http://hazrh.com/ksa_api/add_outgoing.php",{
                    outgoing_type_id:parseInt($scope.outgoing_type_id2),
                    outgoing_plus:$scope.outgoing_plus,
                    reserver_name:$scope.reserver_name,
                    amount:$scope.amount,
                    descr:$scope.descr,
                    token:$rootScope.token,
                    user_id:$rootScope.user_id
                })
                .then(function(resp){
                    if(resp.data.fill){
                       if(resp.data.status){
                        $("#add_outgoing").modal("hide")
                        $scope.outgoing_type_id2=""
                        $scope.outgoing_plus=""
                        $scope.reserver_name=""
                        $scope.amount=""
                        $scope.descr=""
                        $scope.get_outgoing()
                        toastr.success("تم إضافة  منصرف جديد", {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                       }else{
                        toastr.error('لم يتم إضافة منصرف !!', {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                       }
                    }else{
                        toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                        $("#outgoing-loader").fadeOut("slow")
                        $("#outgoing-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#outgoing-loader").fadeOut("slow")
                    $("#outgoing-btn").removeClass("disabled")
                })
               }else{
                toastr.error('البيانات غير مكتملة', {timeOut: 2000})
                $("#outgoing-loader").fadeOut("slow")
                $("#outgoing-btn").removeClass("disabled")
               }
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#outgoing-loader").fadeOut("slow")
                $("#outgoing-btn").removeClass("disabled")
                $("#add_outgoing").modal("hide")
            }
        }
        
         $scope.update_outgoing_md=function(outgoing_plus,reserver_name,amount,descr,id,outgoing_type_id){
            $("#update_outgoing_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.outgoing_plus_selected=outgoing_plus
            $scope.reserver_name_selected=reserver_name
            $scope.amount_selected=parseInt(amount)
            $scope.descr_selected=descr
            $scope.outgoing_id_selected=parseInt(id)
            $scope.outgoing_type_id_selected2=parseInt(outgoing_type_id)
        }
        
        $scope.setMax=function(up,down){
            $scope.setUp=parseInt(up)
            $scope.setDown=parseInt(down)
        }
        
        
        $scope.update_outgoing=function(){
            $("#outgoing2-update-loader").fadeIn("slow")
            $("#outgoing2-update-btn").addClass("disabled")
            if($rootScope.token){
                $http.post("http://hazrh.com/ksa_api/update_outgoing.php",{
                    outgoing_type_id:$scope.outgoing_type_id_selected2,
                    outgoing_plus:$scope.outgoing_plus_selected,
                    reserver_name:$scope.reserver_name_selected,
                    amount:$scope.amount_selected,
                    descr:$scope.descr_selected,
                    outgoing_id:$scope.outgoing_id_selected,
                    user_id:$rootScope.user_id,
                    token:$rootScope.token
                })
                .then(function(resp){
                    if(resp.data.fill){
                        if(resp.data.status){
                            $("#update_outgoing_md").modal("hide")
                            $scope.outgoing_type_id_selected2=""
                            $scope.outgoing_plus_selected=""
                            $scope.reserver_name_selected=""
                            $scope.amount_selected=""
                            $scope.descr_selected=""
                            $scope.outgoing_type_id=""
                            $scope.get_outgoing()
                            toastr.success("تم تعديل البيانات بنجاح", {timeOut: 2000})
                            $("#outgoing2-update-loader").fadeOut("slow")
                            $("#outgoing2-update-btn").removeClass("disabled")
                        }else{
                            toastr.error("لم يتم تعديل البيانات !!", {timeOut: 2000})
                            $("#outgoing2-update-loader").fadeOut("slow")
                            $("#outgoing2-update-btn").removeClass("disabled")
                        }
                    }else{
                        toastr.warning('البيانات غير مكتملة !!', {timeOut: 2000})
                        $("#outgoing2-update-loader").fadeOut("slow")
                        $("#outgoing2-update-btn").removeClass("disabled")
                    }
                }, function (e) {
                    toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                    $("#outgoing2-update-loader").fadeOut("slow")
                    $("#outgoing2-update-btn").removeClass("disabled")
                })
            }else{
                toastr.error('قم بتسجيل الدخول اولا !!', {timeOut: 2000})
                $state.go("app.login")
                $("#outgoing2-update-loader").fadeOut("slow")
                $("#outgoing2-update-btn").removeClass("disabled")
                $("#update_outgoing_md").modal("hide")
            }
        }




    })