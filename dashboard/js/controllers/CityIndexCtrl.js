angular.module("myApp")
    .controller("CityIndexCtrl", function ($scope, $rootScope, $http, $state, $timeout, $filter,API_URL,$ModalService) {
        

        $scope.get_city=function(){
            $(".loadersmart").fadeIn("slow");
                $http.get(API_URL + "city")
                .then(function(resp){
                    $scope.cityes = resp.data.data
                    console.log($scope.city)
                }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }

        
            
        $scope.get_city()
        
        $scope.OpenModal = function (ModalName) {
            $(ModalName).modal('show')
        } 

            
        $scope.HideModal = function (ModalName) {
            $(ModalName).modal('hide')    
        }

        $scope.AddCity = function (ModalName) {
            $.ajax({
                url: API_URL + 'city',
                method: "post",
                data:{
                        name: $scope.name,
                    },
                success:function(data)
                {
                    if (data.success) {
                        toastr.success('تم إضافة المدينة بنجاح', { timeOut: 1500 })
                        $scope.name = ""
                        $scope.get_city()
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
                method: 'DELETE',
                url: API_URL + "city/"+ $scope.bundle_id ,
                success: function (data) {
                    
                    if (data.success) {
                        toastr.success('تم حذف الباقة بنجاح', { timeOut: 1500 })
                        $scope.get_city()
                        $scope.HideModal(ModalName)
                    }
                },
                error: function () {
                    console.log(API_URL)
                }
            })
            
        }
            
        


    })    