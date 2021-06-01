angular.module("myApp")
    .controller("expenses_typeCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {

      
        if(!$rootScope.logined){
            $state.go("app.login")
            }


        $scope.get_expenses_type=function(){
            $http.get("api/get_expenses_type.php")
            .then(function(resp){
                $scope.expenses_type=resp.data
               
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
        }
        $scope.get_expenses_type()
        

        $scope.add_expenses_type_md=function(){
            $("#expenses_type_md").modal({
                    backdrop:false,
                    show:true
                })
        }

        $scope.del_expenses_type_md=function(id,name){
            $("#confirm_del_expenses_type").modal({
                    backdrop:false,
                    show:true
                })
            $scope.expenses_id=parseInt(id)
            $scope.selected_expenses_name=name
       }

        
        $scope.del=function(){
            $http.post("api/del_expenses_type.php",{
                id:$scope.expenses_id,
                user:$rootScope.username
            })
            .then(function(resp){
                if(resp.data.status){
                    $("#confirm_del_expenses_type").modal("hide")
                    $scope.get_expenses_type()
                    toastr.success(' تم حذف القسم', "العملية : حذف بيانات قسم", {timeOut: 2000})
                }else{
                    toastr.error('لم يتم حذف القسم', "العملية : حذف بيانات قسم", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
        }


        $scope.add_expenses_type=function(){
            $http.post("api/add_expenses_type.php",{
                expenses_name:$scope.name,
                user:$rootScope.username
            })
            .then(function(resp){
                if(resp.data.status){
                    $("#expenses_type_md").modal("hide")
                    $scope.name=""
                    $scope.get_expenses_type()
                    toastr.success(' تمت  إضافة قسم جديد', "العملية : إضافة بيانات قسم", {timeOut: 2000})
                }else{
                    toastr.error('لم تتم إضافة القسم', "العملية : إضافة بيانات قسم", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
        }

        $scope.update_expenses_type_md=function(id,name){
            $("#update_expenses_type_md").modal({
                    backdrop:false,
                    show:true
                })
            $scope.selected_expenses_name=name
            $scope.expenses_id=parseInt(id)
        }

        $scope.update_expenses_type=function(){
            $http.post("api/update_expenses_type.php",{
                expenses_id:$scope.expenses_id,
                expenses_name:$scope.selected_expenses_name,
                user:$rootScope.username
            })
            .then(function(resp){
                if(resp.data.status){
                    $("#update_expenses_type_md").modal("hide")
                    $scope.selected_expenses_name=""
                    $scope.get_expenses_type()
                    toastr.success(' تم تعديل بيانات القسم', "العملية : تعديل بيانات قسم", {timeOut: 2000})
                }else{
                    toastr.error('لم تتم عملية تعديل القسم', "العملية : تعديل بيانات قسم", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
        }
    })