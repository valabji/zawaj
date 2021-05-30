angular.module("myApp")
    .controller("bundlesCtrl", function ($scope, $rootScope, $http, $state, $timeout, $st,API_URL) {

        $scope.get_bundles=function(){
            $(".loadersmart").fadeIn("slow");
                $http.get(API_URL + "bundles")
                .then(function(resp){
                    $scope.bundles = resp.data.data
                    console.log($scope.bundles)
                }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }
            
        $scope.get_bundles()
        
        $scope.OpenModal = function (ModalName) {
            $(ModalName).modal('show')
        }
            
        $scope.HideModal = function (ModalName) {
            $(ModalName).modal('hide')    
        }

        $scope.AddBundle = function (ModalName) {
            $.ajax({
                url: API_URL + 'bundles',
                method: "post",
                data:{
                        name: $scope.name,
                        price: $scope.price,
                        description: $scope.description
                    },
                success:function(data)
                {
                    if (data.success) {
                        toastr.success('تم إضافة الباقة بنجاح', { timeOut: 1500 })
                        $scope.name = ""
                        $scope.price = ""
                        $scope.description = ""
                        $scope.get_bundles()
                        $scope.HideModal(ModalName)
                    }
                }
            })
        }
            


        $scope.ConfirmeDelBundle = function (ID, ModalName) {
            $scope.bundle_id = ID
            $scope.OpenModal(ModalName)
        }

        $scope.DelBundle = function (ModalName) {
            $.ajax({
                method: 'delete',
                url: API_URL + "bundles/"+ $scope.bundle_id ,
                success: function (data) {
                    
                    if (data.success) {
                        toastr.success('تم حذف الباقة بنجاح', { timeOut: 1500 })
                        $scope.get_bundles()
                        $scope.HideModal(ModalName)
                    }
                },
                error: function () {
                    console.log(API_URL)
                }
            })

        }



        $scope.ConfirmeUpdateBundle = function (bundle,ModalName) {
            $scope.OpenModal(ModalName)
            $scope.bundle_id = bundle.id
            $scope.update_name = bundle.name
            $scope.update_price = parseInt(bundle.price)
            $scope.update_description = bundle.description
        }


        $scope.UpdateBundle = function (ModalName) {
            if ($scope.update_name && $scope.update_price && $scope.update_description) {
                $http.patch(API_URL + "bundles/" + $scope.bundle_id, {
                    name : $scope.update_name,
                    price: $scope.update_price,
                    description : $scope.update_description
                }).then(function (resp) {
                    console.log(resp)
                })
            }
        }
            
    
    })