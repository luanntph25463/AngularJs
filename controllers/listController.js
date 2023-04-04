window.listController = function($scope,$location,$cookies,$http,$routeParams){
    $scope.title = "Danh Sách";
    let apiURL = "http://localhost:3000/rooms";
    let apiURL1 = "http://localhost:3000/card";
    $scope.findroom = function (){
        $http.get(apiURL).then(function (res) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.card = res.data
            for(var i= 0;i<$scope.card.length;i++){
                if($scope.card[i].price <= $scope.ranger && $scope.star == $scope.card[i].star && $scope.khoangcach == $scope.card[i].khoangcach && $scope.card[i].name == $scope.find){
                    $location.path(`find/${$scope.card[i].id}`)
                }
            }
        })
    }
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
            console.log($scope.valuedetail)
        })
    }
    // getData đón dữ liệu từ api về
        $http.get(apiURL).then(
            function (response) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.room = response.data
        })
 

}