angular.module("myApp")
    .controller("CityIndexCtrl", function ($scope, $rootScope, $http, $state, $timeout, $filter,API_URL,$ModalService) {
        

        $scope.get_city=function(){
            $(".loadersmart").fadeIn("slow");
                $http.get(API_URL + "city")
                .then(function(resp){
                    $scope.cityes = resp.data.data
                }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }

        
            
        $scope.get_city()
        
        $scope.AddCityModal = function (ModalName) {
            $ModalService.OpenModal(ModalName)
        } 

            


        $scope.AddCity = function (ModalName) {
            if ($scope.name) {
                $.ajax({
                    url: API_URL + 'city',
                    method: "post",
                    data: {name: $scope.name},
                    success: function (data) {
                        if (data.success) {
                            toastr.success('تم إضافة المدينة بنجاح', { timeOut: 1500 })
                            $scope.name = ""
                            $scope.get_city()
                            $ModalService.HideModal(ModalName)
                        }
                    }
                })
            } else {
                toastr.error('البيانات غير مكتملة', { timeOut: 2000 , positionClass : "toast-top-center" })  
            }
        }
            


        $scope.ConfirmeDelCity = function (ID, ModalName) {
            $scope.City_id = ID
            $ModalService.OpenModal(ModalName)
        }

        $scope.DelCity = function (ModalName) {
            $.ajax({
                method: 'DELETE',
                url: API_URL + "city/"+ $scope.City_id ,
                success: function (data) {
                    
                    if (data.success) {
                        toastr.success('تم حذف الباقة بنجاح', { timeOut: 1500 })
                        $scope.get_city()
                        $ModalService.HideModal(ModalName)
                    }
                },
                error: function () {
                    toastr.error('لا يوجد اتصال بالانترنت', { timeOut: 2000 , positionClass : "toast-top-center" })  
                }
            })
            
        }
            
        


        $scope.ConfirmeUpdateCity = function (city,ModalName) {
            $ModalService.OpenModal(ModalName)
            $scope.city_id = bundle.id
            $scope.update_name = bundle.name
        }


        $scope.UpdateCity = function (ModalName) {
            if ($scope.update_name) {
                $http.patch(API_URL + "city/" + $scope.city_id, {
                    name : $scope.update_name
                }).then(function (data) {
                    if (data.success) {
                        toastr.success('تم  تعديل المدينة  بنجاح', { timeOut: 1500 })
                        $scope.get_city()
                        $scope.update_name = ""
                        $ModalService.HideModal(ModalName)
                    }
                }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
                })
            } else {
                toastr.error('البيانات غير مكتملة', { timeOut: 2000 , positionClass : "toast-top-center" })  
            }
        }


    })    