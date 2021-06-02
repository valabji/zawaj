

angular.module("myApp")
    .controller("RegisterCtrl",function ($scope,$rootScope,$http,$state,$timeout,$UploadService,API_URL,Upload) {
        $scope.delete_url = ""

        $scope.test = function (file) {
            $scope.progress = 0
            upload = Upload.upload({
              url:'https://api.imgbb.com/1/upload?expiration=600&key=17e94a4340cfa4eb222d6edc94b89b2e',
              data: {
                  image:file,
                }
            });
        
            upload.then(function (resp) {
                console.log(resp)
                console.log(resp.data.data.display_url)
                $scope.display_url = resp.data.data.display_url
                $scope.delete_url = resp.data.data.delete_url
            }, function (response) {
                ///
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
        

     
        
        $scope.SocialDropDownChanged = function()
        {
            if($("#SocialDropDown option:selected").val() == "متزوج")
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
            $scope.picFile = this.src
            if ($scope.delete_url) {
                $UploadService.remove($scope.delete_url)
                alert("call Delete")
                $scope.delete_url = ""
            } else {
                $scope.getBase64FromImageUrl(this.src) 
            }
        });

        $scope.getBase64FromImageUrl =function(url) {
            var img = new Image();

            img.setAttribute('crossOrigin', 'anonymous');

            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width =this.width;
                canvas.height =this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);

                var dataURL = canvas.toDataURL("image/png");
                $scope.test(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            };

            img.src = url;
        }
    
        $scope.ShowDiv2 = function()
        {
            $scope.Selected = $('#DropDown2 option:selected').val();
            if ($scope.Selected == 'رقم 2 (أحد الوالدن أصل وفصل)') {
                $('#Div2').show();
                $('#Div5').hide();
            }
            else if ($scope.Selected == 'غير ذلك')
            {
                $('#Div2').hide();
                $('#Div5').show();
            } else {
                $('#Div2').hide();
                $('#Div5').hide();
            }
        }



        $scope.Register = function () {
      

            $http.post(API_URL + "Users", {
                gender: $scope.gender,
                fullname: $scope.fullname,
                country: $scope.country,
                passport_id : $scope.passport_id,
                passport_expire: $scope.passport_expire,
                height: $scope.height,
                weight: $scope.weight,
                race: $scope.race,
                race2: $scope.race2,
                race3: $scope.race3,
                education: $scope.education,
                employee: $scope.employee,
                skin_color: $scope.skin_color,
                religion: $scope.religion,
                smoker : $scope.smoker,
                finance: $scope.finance,
                finance_alt : $scope.finance_alt,
                body_shape: $scope.body_shape,
                location_ftr_mrg: $scope.location_ftr_mrg,
                marriage_type: $scope.marriage_type,
                marital_status: $scope.marital_status,
                characteristic_of_marriage: $scope.characteristic_of_marriage,
                mult_marriage: $scope.mult_marriage,
                num_sone: $scope.num_sone,
                email: $scope.email,
                phone: $scope.phone,
                password: $scope.password,
                self_bio: $scope.self_bio,
                part_bio: $scope.part_bio,
                profile_photo : $scope.display_url
            })
            .then(function(res){
                console.log(res);
            })
            
        }
        
        


        
    })