window.infoController = function ($scope,$location,$cookies, $routeParams, $http) {
    // $routeParams lấy ra object các thâm số trên url
    // $http thao tác với api (lấy đường dẫn url)
    if($cookies.getObject('user')){
        $scope.user = $cookies.getObject('user');
        let apiURL = "http://localhost:3000/bookings";
        let apiURL1 = "http://localhost:3000/user";
    
        // getData đón dữ liệu từ api về
        $http.get(apiURL).then(function (res) {
            // dữ liệu được đón về thành công sẻ nằm ở biến response
            $scope.bookings = res.data
            $scope.valuedetail = []
            for (var i = 0; i < $scope.bookings.length; i++) {
                if ($scope.user.id == $scope.bookings[i].iduser) {
                    $scope.valuedetail.push({ ...res.data[i] })
                }
            }
        })
            $scope.iduser = $routeParams.id
            if ($scope.iduser) {
                $scope.editId = $routeParams.id
                
                //  Tạo Ra 1 Đối Tượng Sửa
                var inputValue = {}
                $scope.onChangeImg = function (event) {
                    // event.target thể hiện đối tượng thẻ input file bên kia
                    // Sau khi chọn file thì trong đối tượng thẻ đó sẽ có
                    // danh sách file đã chọn
                    console.log(event.target.files);
                    var file = event.target.files[0];
                    // $scope.img = file;
                    // Hiện tại đang là đối tượng file -> chuỗi base64
                    // 1. Đọc file bằng FileReader
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    console.log(file.name)
                    // 2. Đọc toàn bộ nd file và chuyển sang base64
                    reader.onloadend = function () {
                        $scope.inputValue.image = file.name;
                        console.log($scope.inputValue.image)
                    }
            
                };
                $http.get(`${apiURL1}/${$scope.editId}`).then(
                    function (res) {
                        $scope.inputValue = { ...res.data };
                    },
                );
            }
           
        $scope.onEdit = function (editId) {
        $location.path(`booking/${editId}`)
        }
        $scope.onDelete = function (deleteId) {
            let confirm = window.confirm("Bạn xóa muốn xóa không ?");
            if (confirm) {
                //xóa 
                $http.delete(`${apiURL}/${deleteId}`).then(
                    function (response) {
                        if (response.status == 201) {
                        }
                    }
                )
            }
        }
        $scope.onSubmitForm = function () {
            $scope.kiemTraDuLieu = {}
            const isNumeric = /^\d{12}$/;
            const email_reg = /^\w+@[a-zA-Z]+\.\w{2,}(\.\w{2,})?$/i;
            // kiểm Tra nếu họ Tên trống
            let flag = false
            if (!$scope.inputValue || !$scope.inputValue.name) {
                $scope.kiemTraDuLieu.name = true;// Có Lỗi
                flag = true
            }
            if (!$scope.inputValue || !$scope.inputValue.password) {
                $scope.kiemTraDuLieu.password = true;// Có Lỗi
                flag = true
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
           
            if (!flag) {
                // Xử Lý Thêm
                var editId = $scope.editId;
                if (editId) {
                    $http.put(`${apiURL1}/${editId}`, $scope.inputValue).then(
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
                    // for (var i = 0; i < 10; i++) {
                    //     $http.get(apiURL1).then(function (response) {
                    //         // dữ liệu được đón về thành công sẻ nằm ở biến response
                    //         $scope.card = response.data
                    //         for (var i = 0; i < $scope.card.length; i++) {
                    //             if($scope.card[i].idnguoimua == $cookies.user.id){
                    //                 $http.delete(`${apiURL1}/${i}`)
                    //             }
                    //         }
                    //     })
                    // }
                    for (var i = 0; i < 10; i++) {
                                    $http.delete(`${apiURL1}/${i}`)
                    }
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
    }else{
        $location.path("/login")
    }
   

}