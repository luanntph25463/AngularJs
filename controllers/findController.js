window.findController = function ($scope,$location, $routeParams, $http,$cookies) {
    let apiURL = "http://localhost:3000/rooms";
    // getData đón dữ liệu từ api về
    $scope.list = true
    $scope.detailRoom = $routeParams.id;
        // Tạo Ra 1 Đối Tượng Sửa
        if($cookies.getObject('user')){
            $scope.user = $cookies.getObject('user');
        }
    
        $http.get(`${apiURL}/${$scope.detailRoom}`).then(
            function (res) {
                $scope.room = { ...res.data };
            },
        );
}
