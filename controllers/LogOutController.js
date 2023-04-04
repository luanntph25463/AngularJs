window.LogOutController = function ($scope,$location, $routeParams, $http,$cookies) {
    $scope.title = "Login";
                        $cookies.remove("user")
                        $location.path('#!/')
                        $scope.co = false
}
