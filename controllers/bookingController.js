window.bookingController = function ($scope, $location, $cookies, $routeParams, $http) {
    // $routeParams lấy ra object các thâm số trên url
    // $http thao tác với api (lấy đường dẫn url)
    let apiURL = "http://localhost:3000/bookings";
    let apiURL1 = "http://localhost:3000/card";
    $scope.idbooking = $routeParams.id
    // getData đón dữ liệu từ api về
    if ($cookies.getObject('user')) {
        $scope.user = $cookies.getObject('user');
        $scope.onSubmitForm = function () {
            $scope.kiemTraDuLieu = {}
            const isNumeric = /^\d{12}$/;
            const phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            const email_reg = /^\w+@[a-zA-Z]+\.\w{2,}(\.\w{2,})?$/i;
            const datenow = new Date
            // kiểm Tra nếu họ Tên trống
            let flag = false
            if (!$scope.inputValue || !$scope.inputValue.name) {
                $scope.kiemTraDuLieu.name = true;// Có Lỗi
                flag = true
            }
            if (!$scope.inputValue || !$scope.inputValue.check_in) {
                $scope.kiemTraDuLieu.check_in = true;// Có Lỗi
                flag = true
            } else {
                if ($scope.inputValue.check_in > $scope.inputValue.check_out) {
                    $scope.kiemTraDuLieu.check_in1 = true;// Có Lỗi
                    flag = true
                }
                if ($scope.inputValue.check_in <= datenow) {
                    $scope.kiemTraDuLieu.check_in2 = true;// Có Lỗi
                    flag = true
                }
            }
            if (!$scope.inputValue || !$scope.inputValue.check_out) {
                $scope.kiemTraDuLieu.check_out = true;// Có Lỗi
                flag = true
            } else {
                if ($scope.inputValue.check_out <= datenow) {
                    $scope.kiemTraDuLieu.check_out1 = true;// Có Lỗi
                    flag = true
                }
            }
            if (!$scope.inputValue || !$scope.inputValue.cccd) {
                $scope.kiemTraDuLieu.cccd = true;// Có Lỗi
                flag = true
            } else {
                if (isNumeric.test($scope.inputValue.cccd) == false) {
                    $scope.kiemTraDuLieu.cccd1 = true;// Có Lỗi
                    flag = true
                }
            }
            if (!$scope.inputValue || !$scope.inputValue.phone) {
                $scope.kiemTraDuLieu.phone = true;// Có Lỗi
                flag = true
            } else {
                if (phone.test($scope.inputValue.phone) == false) {
                    $scope.kiemTraDuLieu.phone1 = true;// Có Lỗi
                    flag = true
                }
            }
            if (!$scope.inputValue || !$scope.inputValue.email) {
                $scope.kiemTraDuLieu.email = true;// Có Lỗi
                flag = true
            } else {
                if (email_reg.test($scope.inputValue.email) == false) {
                    $scope.kiemTraDuLieu.email1 = true;// Có Lỗi
                    flag = true
                }
            }
            if (!$scope.inputValue || !$scope.inputValue.quantity) {
                $scope.kiemTraDuLieu.quantity = true;// Có Lỗi
                flag = true
            }
            if (!$scope.inputValue || !$scope.inputValue.message) {
                $scope.kiemTraDuLieu.message = true;// Có Lỗi
                flag = true
            }
            if (!$scope.inputValue || !$scope.inputValue.payment) {
                $scope.kiemTraDuLieu.payment = true;// Có Lỗi
                flag = true
            }

            if (!$scope.inputValue || !$scope.inputValue.gender) {
                $scope.kiemTraDuLieu.gender = true;// Có Lỗi
                flag = true
            }

            if (!flag) {
                // Xử Lý Thêm
                var ds = $scope.danhSach;
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
                        quantity: $scope.inputValue.quantity,
                        check_in: new Date($scope.inputValue.check_in).toLocaleDateString(),
                        check_out: new Date($scope.inputValue.check_out).toLocaleDateString(),
                        phone: $scope.inputValue.phone,
                        email: $scope.inputValue.email,
                        gender: $scope.inputValue.gender,
                        payment: $scope.inputValue.payment,
                        status: 1,
                        message: $scope.inputValue.message,
                        cccd: $scope.inputValue.cccd,
                        totalamount: $scope.card.price,
                        iduser: $scope.user.id,
                    }
                    for (var i = 0; i < 10; i++) {
                        $http.get(apiURL1).then(function (response) {
                            // dữ liệu được đón về thành công sẻ nằm ở biến response
                            $scope.card = response.data
                            for (var i = 0; i < $scope.card.length; i++) {
                                if($scope.card[i].idnguoimua == $scope.user.id){
                                    $http.delete(`${apiURL1}/${$scope.card[i].id}`)
                                }
                            }
                        })
                    }
                    // for (var i = 0; i < 10; i++) {
                    //     if ($scope.card[i].idnguoimua == $cookies.user.id) {
                    //         $http.delete(`${apiURL1}/${$scope.card[i].id}`)
                    //     }
                    // }
                // Đây là Cục Đối tượng
                // push đối tượng vào mảng đối tượng danh Sách
                // call api với phương thức post để đẩy dữ liệu vào
                $http.post(
                    apiURL, // đường dẫn API
                    newItem
                ).then(
                    function (response) {
                        $location.path("/booking")
                    }
                )
            }
        }
    }
    $scope.onDelete1 = function (deleteId) {
        let confirm = window.confirm("Bạn xóa muốn xóa không ?");
        if (confirm) {
            //xóa 
            $http.delete(`${apiURL1}/${deleteId}`).then(
                function (response) {
                    if (response.status == 201) {
                        $scope.getData();
                    }
                }
            )
        }
    }
}else {
    $location.path("/login")
}
$http.get(apiURL1).then(function (response) {
    // dữ liệu được đón về thành công sẻ nằm ở biến response
    $scope.card = response.data
    $scope.card.price = 0
    for (var i = 0; i < $scope.card.length; i++) {
        $scope.card.price += $scope.card[i].price
    }
})
$http.get(apiURL1).then(function (res) {
    // dữ liệu được đón về thành công sẻ nằm ở biến response
    $scope.card = res.data
    $scope.valuedetail = []
    $scope.card.price = 0
    for (var i = 0; i < $scope.card.length; i++) {
        if ($scope.user.id == $scope.card[i].idnguoimua) {
            $scope.valuedetail.push({ ...res.data[i] })
            $scope.card.price += $scope.card[i].price
        }
    }
})
if ($scope.idbooking) {
    $scope.editId = $routeParams.id
    //  Tạo Ra 1 Đối Tượng Sửa
    var inputValue = {}
    $http.get(`${apiURL}/${$scope.editId}`).then(
        function (res) {
            $scope.inputValue = { ...res.data };
        },
    );
}

}