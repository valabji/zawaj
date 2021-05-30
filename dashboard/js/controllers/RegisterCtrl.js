angular.module("myApp")
    .controller("RegisterCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st,API_URL) {
    
        $scope.SocialDropDownChanged = function()
        {
            if($("#SocialDropDown option:selected").val() == "2")
            {
                $('.Maried').show();
            }
            else
            {
                $('.Maried').hide();
            }
        }
    
        $scope.OTPModal = function()
        {
            $('#OTPModal').modal('show');
        }
    
    
        $(".Link").click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 1500);
        });
    
    
        $scope.Check = function(type) {
            $('#M').css("opacity", 1);
            $('#F').css("opacity", 1);
            if (type == 1) {
                $scope.gender = true
                $('#F').css("opacity", 0.7);
                $('#Gender' + type).prop("checked", true);
                $('.Woman').hide();
                $('.Man').show();
            }
            else {
                $scope.gender = false
                $('#M').css("opacity", 0.7);
                $('#Gender' + type).prop("checked", true);
                $('.Woman').show();
                $('.Man').hide();
            }
        }
    
    
        // $scope.readURL = function (input) {
        //     if (input.files && input.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             $('#blah').attr('src', e.target.result);
        //         }
        //         reader.readAsDataURL(input.files[0]);
        //     }
        // }
    
        // $("#imgInp").change(function () {
        //     $scope.readURL(this);
        // });


        $scope.previewPhoto = function(event){
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
                     } 
                
                $scope.$apply(function($scope) {
                });
            }
            reader.readAsDataURL($scope.x)
        }

        $("#avatar_file img").click(function () {
            alert(this.src)
            $scope.avatar_url = this.src
        });
    
        $scope.ShowDiv2 = function()
        {
            $scope.Selected = $('#DropDown2 option:selected').val();
            if($scope.Selected == 2)
            {
                $('#Div2').show();
                $('#Div5').hide();
            }
            else if ($scope.Selected == 5)
            {
                $('#Div2').hide();
                $('#Div5').show();
            } else {
                $('#Div2').hide();
                $('#Div5').hide();
            }
        }



        $scope.Register = function () {
            var fd = new FormData();

            fd.append('gender',$scope.gender);
            fd.append('fullname',$scope.full_name);
            fd.append('country',$scope.country);
            fd.append('passport_id',$scope.passport_id);
            fd.append('passport_expire',$scope.passport_expire);

            fd.append('height',parseInt($scope.height));
            fd.append('weight',parseInt($scope.weight));
            fd.append('race',$scope.race);
            fd.append('race2',$scope.race2);
            fd.append('race3',$scope.race3);
            fd.append('education',$scope.education);
            fd.append('employee',$scope.employee);

            fd.append('skin_color',$scope.skin_color);
            fd.append('religion',$scope.religion);
            fd.append('smoker',$scope.smoker);
            fd.append('finance',$scope.finance);
            fd.append('finance_alt',$scope.finance_alt);
            fd.append('body_shape',$scope.body_shape);
            fd.append('location_ftr_mrg',$scope.location_ftr_mrg);
            fd.append('marriage_type',$scope.marriage_type);
            fd.append('marital_status',$scope.marital_status);
            fd.append('characteristic_of_marriage',$scope.characteristic_of_marriage);
            fd.append('mult_marriage',$scope.mult_marriage);
            fd.append('num_sone',$scope.num_sone);

            fd.append('email',$scope.email);
            fd.append('phone',$scope.phone);
            fd.append('password',$scope.password);
            fd.append('self_bio',$scope.self_bio);
            fd.append('part_bio',$scope.part_bio);
            fd.append('profile-photo',$scope.img_src);


            $http.post(API_URL+"Users", fd, {
            transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                    console.log(res);
            })
            
        }
        
        
    })