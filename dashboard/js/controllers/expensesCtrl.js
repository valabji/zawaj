angular.module("myApp")
    .controller("expensesCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {
       
        if(!$rootScope.logined){
            $state.go("app.login")
            }

        $scope.get_expenses=function(){
            $http.get("api/get_expenses.php")
            .then(function(resp){
                $scope.expenses=resp.data
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
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


        $scope.get_expenses()


        $scope.add_expenses_md=function(){
            $('#expenses_md').modal({
                    backdrop:false,
                    show:true
                })           
        }

        $scope.add_expenses=function(){
            
            $http.get("api/GeneraterRandom.php")
            .then(function(resp){
                $scope.rander_number=parseInt(resp.data.rander_number)
                $scope.num=$scope.rander_number
                console.log($scope.num)  
            })

            $http.post("api/add_expenses.php",{
                type:parseInt($scope.type),
                descr:$scope.descr,
                cash:$scope.cash,
                invoic_id:$scope.num,
                user:$rootScope.username
            }).then(function(resp){
                if(resp.data.status){
                    $scope.type="";
                    $scope.descr="";
                    $scope.cash="";
                    $scope.num="";
                    $("#expenses_md").modal("hide");
                    toastr.success('تمت العملية', {timeOut: 2000})
                    $scope.get_expenses()
                }else{
                    toastr.error('لم تتم العملية ', {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بقاعدة البيانات', {timeOut: 2000})
            })
        }


        $scope.update_cash_md=function(cash,id,type,descr){            
            $scope.selected_cash=parseFloat(cash)
            $scope.selected_id=parseInt(id)
            $scope.selected_type=type
            $scope.selected_descr=descr
            $("#update_cash_md").modal({
                    backdrop:false,
                    show:true
                });
        }

        $scope.update_cash=function(){
            $http.post("api/update_cash.php",{
                type:$scope.selected_type,
                descr:$scope.selected_descr,
                cash:$scope.selected_cash,
                id:$scope.selected_id,
                user:$rootScope.username,
            }).then(function(resp){
                if(resp.data.status){
                    $scope.selected_type="";
                    $scope.selected_descr="";
                    $scope.selected_cash="";
                    $("#update_cash_md").modal("hide");
                    toastr.success('تمت عملية التعديل بنجاح', "العملية :  تعديل معاملة حسابية   ", {timeOut: 2000})
                    $scope.t_m()
                    $scope.t_w()
                    $scope.t_cash()
                    $scope.get_cash()
                }else{
                    toastr.error('لم تتم العملية ', "العملية :  تعديل معاملة حسابية   ", {timeOut: 2000})
                }
            }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }
        
    })