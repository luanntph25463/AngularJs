window.findController = function ($scope,$location, $routeParams, $http,$cookies) {
    let apiURL = "http://localhost:3000/rooms";
    let apiURL1 = "http://localhost:3000/card";
    // getData đón dữ liệu từ api về
    $scope.list = true
    $scope.detailRoom = $routeParams.id;
        // Tạo Ra 1 Đối Tượng Sửa
        if($cookies.getObject('user')){
            $scope.user = $cookies.getObject('user');

            $http.get(apiURL1).then(function (res) {
                // dữ liệu được đón về thành công sẻ nằm ở biến response
                $scope.card = res.data
                $scope.valuedetail = []
                $scope.card.price = 0
                for(var i= 0;i<$scope.card.length;i++){
                    if($scope.user.id == $scope.card[i].idnguoimua){
                        $scope.valuedetail.push({...res.data[i]})
                        $scope.card.price += $scope.card[i].price
        
                    }
                }
            })
        }
    
        $http.get(`${apiURL}/${$scope.detailRoom}`).then(
            function (res) {
                $scope.room = { ...res.data };
            },
        );
}
