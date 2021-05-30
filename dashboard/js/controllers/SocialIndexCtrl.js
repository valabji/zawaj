angular.module("myApp")
    .controller("SocialIndexCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st,API_URL) {


        
        
        $scope.get_settings=function(){
            $(".loadersmart").fadeIn("slow");
                $http.get(API_URL + "settings")
                .then(function(resp){
                    $scope.settings = resp.data.data
                    console.log($scope.settings)
                }, function (e) {
                toastr.error('لا يوجد اتصال بالانترنت', {timeOut: 2000})
            })
        }


        $scope.get_settings()

        $scope.OpenModal = function (ModalName) {
            $(ModalName).modal('show')
        }


         $scope.HideModal = function (ModalName) {
            $(ModalName).modal('hide')    
        }

        $scope.AddSettings = function (ModalName) {
            $.ajax({
                url: API_URL + 'settings',
                method: "post",
                data:{
                    name: $scope.name,
                    value: $scope.value
                    },
                success:function(data)
                {
                    if (data.success) {
                        toastr.success('تم العملية بنجاح', { timeOut: 1500 })
                        $scope.get_settings()
                        $scope.HideModal(ModalName)
                    }
                }
            })
        }

    })