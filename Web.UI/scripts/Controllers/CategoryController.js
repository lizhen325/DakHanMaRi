/// <reference path="../Venders/angular.js" />
(function () {
    'use strict';
    angular.module('DakHanMaRi')
            .controller('CategoryController', CategoryController)
    CategoryController.$inject = ['$scope', '$http', 'ngDialog'];
    function CategoryController($scope, $http, ngDialog) {
        $http({
            method: 'GET',
            url: '/Category/GetProductCategory',
        }).then(function (response) {
            console.log(response);
            $scope.productCategories = response.data;
        })
    }
})();