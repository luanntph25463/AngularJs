window.detailController = function ($scope, $routeParams,$location, $http,$cookies) {
    let apiURL = "http://localhost:3000/rooms";
    let apiURL1 = "http://localhost:3000/comments";
    let apiURL2 = "http://localhost:3000/card";
    // getData đón dữ liệu từ api về
    $scope.detailRoom = $routeParams.userId;
    $scope.detailRoom1 = $routeParams.idcate;
        // Tạo Ra 1 Đối Tượng Sửa
      
        if($cookies.getObject('user')){
            $scope.user = $cookies.getObject('user');
            $scope.onAddComment = function () {
                $scope.kiemTraDuLieu = {}
                // kiểm Tra nếu họ Tên trống
                let flag = false
                if ( !$scope.content) {
                    $scope.kiemTraDuLieu.content = true;// Có Lỗi
                    flag = true
                }
                if (!flag) {
                    // Xử Lý Thêm
                    var editId = $scope.editId;
                        var newItem = {
                            idroom:$scope.room.id,
                            name:$scope.room.name,
                            content:$scope.content,
                            ten: $scope.user.name,
                            star: 3,
                        }
                        $http.post(
                            apiURL1, // đường dẫn API
                            newItem
                        ).then(
                            function (response) {
                                if (response.status == 201) {
                                    $scope.getData();
                                }
                            }
                        )
                        $scope.alert = "Thêm Thành Công Vào Danh Sách";    
                }
            }
            if ($cookies.getObject('user')) {
                $scope.user = $cookies.getObject('user');
            $http.get(apiURL2).then(function (res) {
                // dữ liệu được đón về thành công sẻ nằm ở biến response
                $scope.card = res.data
                $scope.valuedetail1 = []
                $scope.card.price = 0
                for(var i= 0;i<$scope.card.length;i++){
                    if($scope.user.id == $scope.card[i].idnguoimua){
                        $scope.valuedetail1.push({...res.data[i]})
                        $scope.card.price += $scope.card[i].price
        
                    }
                }
                console.log($scope.card.price)
            })
        }
            $scope.booknow = function () {
                $scope.kiemTraDuLieu = {}
                // kiểm Tra nếu họ Tên trống
                    // Xử Lý Thêm
                        var newItems = {
                            image:$scope.room.image,
                            price: $scope.room.price,
                            name: $scope.room.name,
                            des: $scope.room.des,
                            idnguoimua: $scope.user.id
                        }
                        $http.post(
                            apiURL2, // đường dẫn API
                            newItems
                        ).then(
                            function (response) {
                                if (response.status == 201) {
                                    $location.path(`booking`)
                                }
                            }
                        )
                        $scope.alert = "Thêm Thành Công Vào Danh Sách";
                    
            }
        }
    
        $http.get(`${apiURL}/${$scope.detailRoom}`).then(
            function (res) {
                $scope.room = { ...res.data };
            },
        );

        $http.get(`${apiURL1}`).then(
            function (response) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.comment = response.data
        })
        $http.get(apiURL).then(function (res) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.roomdetail = res.data
            $scope.valuedetail = []
            for(var i= 0;i<$scope.roomdetail.length;i++){
                if($scope.detailRoom1 == $scope.roomdetail[i].idcate){
                    $scope.valuedetail.push({...res.data[i]})
                }
            }
        })
           $http.get(apiURL1).then(function (res) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.comment1 = res.data
            $scope.valucomment = []
            for(var i= 0;i<$scope.comment1.length;i++){
                if($scope.detailRoom == $scope.comment1[i].idproduct){
                    $scope.valucomment.push({...res.data[i]})
                }
            }
            console.log($scope.valucomment)
        })
}