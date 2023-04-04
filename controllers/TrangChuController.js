window.TrangChuController = function ($scope,$cookies,$location, $routeParams, $http) {
    $scope.title = "Trang Chủ";
    let apiURL = "http://localhost:3000/rooms";
    let apiURL1 = "http://localhost:3000/card";
    let apiURL2 = "http://localhost:3000/categories";
    // getData đón dữ liệu từ api về
    $scope.co = false;
    if($cookies.getObject('user')){
        $scope.user = $cookies.getObject('user');
        $scope.showlogin = true
        console.log($scope.user)

    }else{
         console.log($scope.user)
    }
    $scope.logout = function (){
        $cookies.removeOBject("user")
    }
    $http.get(apiURL1).then(function (res) {
        // dữ liệu được đón về thành công sẻ nằm ở biến response
        $scope.card = res.data
        $scope.card.price = 0
        for(var i= 0;i<$scope.card.length;i++){
            $scope.card.price += $scope.card[i].price
        }

    })
    $http.get(apiURL2).then(
        function (response) {
        // dữ liệu được đón về thành công sẻ nằm ở biến response
        $scope.cate = response.data
    })
    $scope.getData = function () {
        $http.get(apiURL).then(
            function (response) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.rooms = response.data
        })
    }
    $scope.getData();
}
