var loginApp = angular.module('DakHanMaRi',[]);
loginApp.controller('LoginController', function ($scope, $http) {
    $scope.login = function () {
        $http({
            url: '/Login/GetAdminProfileByUserId',
            method: 'POST',
            params: { userId: $scope.userId }
        }).then(function (response) {
            if ($scope.userId == response.data.userId && $scope.Password == response.data.Password) {
                window.location.href = '/Home/Index';
                return;
            } else {
                $scope.error = "ID or Password is Incorrect!";
            }
        })
    }
    
})