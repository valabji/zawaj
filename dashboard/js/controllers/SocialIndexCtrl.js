angular.module("myApp")
    .controller("SocialIndexCtrl",function ($scope,$rootScope,$http,$state,$timeout,$ModalService,API_URL) {


        
        
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

        $scope.AddSettingsModal = function (ModalName) {
            $(ModalName).modal('show')
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
                        $scope.name = ""
                        $scope.value = ""
                        $ModalService.HideModal(ModalName)
                    }
                }
            })
        }

        $scope.ConfirmeDelSettings = function (ID, ModalName) {
            $scope.Settings_id = ID
            $ModalService.OpenModal(ModalName)
        }


        $scope.ConfirmeUpdateSetting = function (setting,ModalName) {
            $ModalService.OpenModal(ModalName)
            $scope.setting_id = setting.id
            $scope.update_name = setting.name
            $scope.update_value = setting.value
        }


        $scope.UpdateSetting = function (ModalName) {
            if ($scope.update_name && $scope.update_value) {
                
                $.ajax({
                    method: 'PATCH',
                    url: API_URL + "settings/" + $scope.setting_id,
                    data: {
                        name: $scope.update_name,
                        value : $scope.update_value
                    },
                    success: function (data) {
                        if (data.success) {
                            toastr.success('تم  التعديل   بنجاح', { timeOut: 1500 })
                            $scope.update_name = ""
                            $scope.update_value = ""
                            $scope.get_settings()
                            $ModalService.HideModal(ModalName)
                        }
                    },
                    error: function () {
                        toastr.error('لا يوجد اتصال بالانترنت', { timeOut: 2000 , positionClass : "toast-top-center" })  
                    }
                })
            } else {
                toastr.error('البيانات غير مكتملة', { timeOut: 2000 , positionClass : "toast-top-center" })  
            }
        }

    })