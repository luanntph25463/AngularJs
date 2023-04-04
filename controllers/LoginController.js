window.LoginController = function ($scope,$location, $routeParams, $http,$cookies) {
    $scope.title = "Login";
    let apiURL = "http://localhost:3000/user";
    $scope.login = function () {
            $http.get(apiURL).then(
                function (response) {
                // dữ liệu được đón về thành công sẻ nằm ở biến response
                $scope.user = response.data
                for(var i = 0;i<$scope.user.length;i++){
                    if($scope.email == $scope.user[i].email && $scope.password == $scope.user[i].password){
                        $cookies.putObject("user",$scope.user[i])
                        $location.path('#!/')
                    }else{
                        $scope.flag = true
                    }
                }
            },
            )
    }
   

}
