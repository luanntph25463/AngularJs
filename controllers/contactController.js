window.contactController = function ($scope, $location, $cookies, $routeParams, $http) {
    // $routeParams lấy ra object các thâm số trên url
    // $http thao tác với api (lấy đường dẫn url)
    let apiURL = "http://localhost:3000/contact";
    let apiURL1 = "http://localhost:3000/card";

    // getData đón dữ liệu từ api về
    $http.get(apiURL).then(function (response) {
        // dữ liệu được đón về thành công sẻ nằm ở biến response
        $scope.bookings = response.data
    })
    if ($cookies.getObject('user')) {
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
    $scope.onEdit = function (editId) {
        $scope.editId = editId;
        // Tạo Ra 1 Đối Tượng Sửa
        var inputValue = {}
        $http.get(`${apiURL}/${editId}`).then(
            function (res) {
                $scope.inputValue = { ...res.data };
            },
        );
    }
    $scope.onSubmitForm = function () {
        $scope.kiemTraDuLieu = {}
        const isNumeric = /^\d+$/;
        const phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const email_reg = /^\w+@[a-zA-Z]+\.\w{2,}(\.\w{2,})?$/i;
        // kiểm Tra nếu họ Tên trống
        let flag = false
        if (!$scope.inputValue || !$scope.inputValue.name) {
            $scope.kiemTraDuLieu.name = true;// Có Lỗi
            flag = true
        }
        if (!$scope.inputValue || !$scope.inputValue.phone) {
            $scope.kiemTraDuLieu.phone = true;// Có Lỗi
            flag = true
        }else{
            if (phone.test($scope.inputValue.phone) == false) {
                $scope.kiemTraDuLieu.phone1 = true;// Có Lỗi
                flag = true
            }
        }
        if (!$scope.inputValue || !$scope.inputValue.email) {
            $scope.kiemTraDuLieu.email = true;// Có Lỗi
            flag = true
        }else{
            if (email_reg.test($scope.inputValue.email) == false) {
                $scope.kiemTraDuLieu.email1 = true;// Có Lỗi
                flag = true
            }
        }
        if (!$scope.inputValue || !$scope.inputValue.message) {
            $scope.kiemTraDuLieu.message = true;// Có Lỗi
            flag = true
        }
       
        if (!flag) {
            // Xử Lý Thêm
            var editId = $scope.editId;
            if (editId) {
                $http.put(`${apiURL}/${editId}`, $scope.inputValue).then(
                    function (response) {
                        if (response.status == 201) {
                            $scope.getData();
                        }
                    }
                )
            } else {
                var newItem = {
                    name: $scope.inputValue.name,
                    phone: $scope.inputValue.phone,
                    email: $scope.inputValue.email,
                    message: $scope.inputValue.message,
                }
                // Đây là Cục Đối tượng
                // push đối tượng vào mảng đối tượng danh Sách
                // call api với phương thức post để đẩy dữ liệu vào
                $http.post(
                    apiURL, // đường dẫn API
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
    }
    $scope.onDelete = function (deleteId) {
        let confirm = window.confirm("Bạn xóa muốn xóa không ?");
        if (confirm) {
            //xóa 
            $http.delete(`${apiURL}/${deleteId}`).then(
                function (response) {
                    if (response.status == 201) {
                        $scope.getData();
                    }
                }
            )
        }
    }
}