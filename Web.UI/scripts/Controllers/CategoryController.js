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

        $scope.visible = false;
        $scope.getItemsByProductId = function(productId){
            $http({
                method: 'GET',
                url: '/Item/GetItemsByProductId',
                params: { ProductId: JSON.stringify(productId) }
            }).then(function (response) {
                $scope.items = response.data;
                $scope.visible = true;
            });
        }

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
                                    "<span style='color:blue;' class='glyphicon glyphicon-list'><strong>Products</strong></span>" +
                                "</div>" +                             
                            "</div>" +
                            "<div class='row'>"+
                                "<div class='col-sm-4' ng-repeat='product in products'>" +
                                    "<button class='btn btn-default' ng-click=getItemsByProductId(product.ProductId)>{{product.ProductName}}</button>" +
                                "</div>"+
                            "</div>"+
                            "<div>"+
                                "<table class='table'  ng-if='visible'>" +
                                    "<tr>" +
                                        "<th>Name</th>" +
                                        "<th>Price</th>" +
                                        "<th>Quality</th>" +
                                        "<th>Edit</th>" +
                                        "<th>Delete</th>" +
                                    "</tr>"+
                                    "<tr ng-repeat='item in items'>"+
                                        "<td>{{item.ItemName}}</td>"+
                                        "<td>{{item.ItemPrice}}</td>"+
                                        "<td>{{item.ItemQuality}}</td>"+
                                        "<td><button class='btn btn-primary'>Edit</button></td>"+
                                        "<td><button class='btn btn-primary'>Delete</button></td>"+
                                    "</tr>"+
                                "</table>"+
                            "</div>",
                    plain: true,
                    scope: $scope
                });
            })
        }
    }
})();