angular.module("myApp")
    .controller("profileCtrl", function ($scope, $rootScope, $http, $state, $timeout, $st,$window,API_URL) {

        if (!$rootScope.logined) {
            $state.go("app.home")
        }

        $scope.ChangeColor = function(Color) {
            $('#profile-header').css("background-color", "#" + Color);
        }

        $scope.ShowSearchDiv = function (){
            if($("#SearchDiv").is(":visible")){
                $('#SearchDiv').hide('slow');
            }else{
                $('#SearchDiv').show('slow');
            }
        }

        $scope.SendImageModal = function (){
            $('#SendImageModal').modal('show');
        }

        $scope.ConfirmPopUp = function (){
            $('#ConfirmModal').modal('show');
        }
         

        $scope.ShownCheck = function (){
            if (document.getElementById("ShownCheck").checked == true)
            {
                $('#ShownCheckText').text("مرئي");
            }
            else
            {
                $('#ShownCheckText').text("غير مرئي");
            }
        }

        if ($window.sessionStorage["userInfo"]) {
            var credentials = JSON.parse($window.sessionStorage["userInfo"]);
            $rootScope.full_name = credentials.full_name
            $rootScope.passport_id = credentials.passport_id
            $rootScope.email = credentials.email
         }

        
        $scope.UpdateProfile = function () {
            $http.patch(API_URL + "users/5", {
                "email": $rootScope.email,
                "fullname" : $rootScope.full_name
            }).then(function (resp) {
                console.log(resp)
            })
        }
        

        $scope.UpdateProfile()
        
    
    })