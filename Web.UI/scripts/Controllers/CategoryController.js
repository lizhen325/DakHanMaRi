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
            $scope.productCategories = response.data;
        })

        $scope.getProductByCategoryId = function (categoryId) {
            $http({
                method: 'GET',
                url: '/Product/GetProductsByCategoryId',
                params: { CategoryId: JSON.stringify(categoryId) }
            }).then(function (response) {
                $scope.products = response.data;
                ngDialog.openConfirm({
                    template:
                            "<div class='row'>" +
                                "<div class='col-sm-2'>" +
                                    "<a href='#'><span class='glyphicon glyphicon-list' sytle='border:none;'><strong>Products</strong></span></a>" +
                                "</div>" +                             
                            "</div>" +
                            "<div class='row'>"+
                                "<div class='col-sm-4'>" +
                                    "<strong ng-repeat='product in products' style='color:blue; padding:10px;'>{{product.ProductName}}</strong>" +
                                "</div>"+
                            "</div>",
                    plain: true,
                    scope: $scope
                });
            })
        }
    }
})();