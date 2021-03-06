﻿/// <reference path="../Venders/angular.js" />
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

        $scope.editProductCategory = function (productCategoryId) {
            console.log(productCategoryId);
        };

        $scope.deleteProductCategory = function (productCategoryId) {
            console.log(productCategoryId);
        };

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

        //$scope.products = null;
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
                            "<div class='row'>" +
                                "<div class='col-sm-4' ng-repeat='product in products'>" +
                                    "<button class='btn btn-default' ng-click=getItemsByProductId(product.ProductId)>{{product.ProductName}}</button>" +
                                "</div>" +
                            "</div>" +
                            "<div>" +
                                "<table class='table'  ng-if='visible'>" +
                                    "<button class='btn btn-primary' style='float:right' ng-if='visible' ng-click='addItemDialog()'>Add Item</button>" +
                                    "<tr>" +
                                        "<th>Name</th>" +
                                        "<th>Price</th>" +
                                        "<th>Quality</th>" +
                                        "<th>Edit</th>" +
                                        "<th>Delete</th>" +
                                    "</tr>" +
                                    "<tr ng-repeat='item in items'>" +
                                        "<td>{{item.ItemName}}</td>" +
                                        "<td>{{item.ItemPrice}}</td>" +
                                        "<td>{{item.ItemQuality}}</td>" +
                                        "<td><button class='btn btn-primary' ng-click='editItem(item.ItemId)'>Edit</button></td>" +
                                        "<td><button class='btn btn-primary' ng-click='deleteItem(item.ItemId)'>Delete</button></td>" +
                                    "</tr>" +
                                "</table>" +
                            "</div>",
                    plain: true,
                    scope: $scope
                });
            })
        };

        $scope.addItemDialog = function (productId) {
            console.log(productId);
            ngDialog.openConfirm({
                template:
                    "<form align='center' novalidate name='itemAddForm' ng-submit='addItem(item, product.ProductName)'>" +
                            "<table class='table'>" +
                            "<h2>Add Item</h2>" +
                                "<tr>" +
                                    "<td><label for='name'> Name: </label>" + "</td>" +
                                    "<td><input type='text' name='itemname' placeholder='Item Name' ng-model='item.ItemName' required/></td>" +
                                    "<td style='color:red;' ng-show='itemAddForm.itemname.$error.required && itemAddForm.itemname.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='price'> Price: </label></td>" +
                                    "<td><input type='text' name='itemprice' ng-pattern='/^[0-9]+([.]{1}[0-9]+){0,1}$/' placeholder='Price' ng-model='item.ItemPrice' required/></td>" +
                                    "<td style='color:red;' ng-show='itemAddForm.itemprice.$error.pattern && itemAddForm.itemprice.$touched'>must be a number</td>" +
                                    "<td style='color:red;' ng-show='itemAddForm.itemprice.$error.required && itemAddForm.itemprice.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='quality'> Quality: </label></td>" +
                                    "<td><input type='text' name='itemquality' ng-pattern='/^[0-9]+$/' placeholder='Quality' ng-model='item.ItemQuality' required/></td>" +
                                    "<td style='color:red;' ng-show='itemAddForm.itemquality.$error.pattern && itemAddForm.itemquality.$touched'>must be a number</td>" +
                                    "<td style='color:red;' ng-show='itemAddForm.itemprice.$error.required && itemAddForm.itemprice.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='product'> Product: </label></td>" +
                                    "<td>" +
                                        "<select ng-model='product.ProductName' required>" +
                                            "<option value=''>Select Product Category</option>" +
                                            "<option ng-repeat='product in products' value='{{product.ProductName}}'>{{product.ProductName}}</option>" +
                                        "</select>" +
                                    "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td colspan='2'><button type='submit' class='btn btn-primary' ng-disabled='itemAddForm.$invalid'> Add </button> " +
                                        "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                                "</tr>" +
                            "</table>" +
                        "</form>",
                plain: true,
                scope: $scope
            });
        };
        
        $scope.addItem = function (item, productName) {
            console.log(item);
            console.log(productName);
            $http({
                method: 'post',
                url: '/Item/AddItem',
                data: { item: item, productName: productName }
            }).then(function (response) {
                console.log(response);
                if (response.statusText == "OK") {
                    alert(response.data);
                    location.reload();
                };
            });
        };
        $scope.editItem = function (itemId) {
            $http({
                method: 'GET',
                url: '/Item/GetItemByItemId',
                params: { ItemId: JSON.stringify(itemId) }
            }).then(function (response) {
                $scope.item = response.data;
                ngDialog.openConfirm({
                    template:
                        "<form align='center' novalidate name='itemEditForm' ng-submit='UpdateItem(item, product.ProductName)'>" +
                            "<table class='table'>" +
                            "<h2>Edit Item</h2>" +
                                "<tr>" +
                                    "<td><label for='name'> Name: </label>" + "</td>" +
                                    "<td><input type='text' name='itemname' placeholder='Item Name' ng-model='item.ItemName' required/></td>" +
                                    "<td style='color:red;' ng-show='itemEditForm.itemname.$error.required && itemEditForm.itemname.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='price'> Price: </label></td>" +
                                    "<td><input type='text' name='itemprice' ng-pattern='/^[0-9]+([.]{1}[0-9]+){0,1}$/' placeholder='Price' ng-model='item.ItemPrice' required/></td>" +
                                    "<td style='color:red;' ng-show='itemEditForm.itemprice.$error.pattern && itemEditForm.itemprice.$touched'>must be a number</td>" +
                                    "<td style='color:red;' ng-show='itemEditForm.itemprice.$error.required && itemEditForm.itemprice.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='quality'> Quality: </label></td>" +
                                    "<td><input type='text' name='itemquality' ng-pattern='/^[0-9]+$/' placeholder='Quality' ng-model='item.ItemQuality' required/></td>" +
                                    "<td style='color:red;' ng-show='itemEditForm.itemquality.$error.pattern && itemEditForm.itemquality.$touched'>must be a number</td>" +
                                    "<td style='color:red;' ng-show='itemEditForm.itemprice.$error.required && itemEditForm.itemprice.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='product'> Product: </label></td>" +
                                    "<td>" +
                                        "<select ng-model='product.ProductName' required>" +
                                            "<option value=''>Select Product Category</option>" +
                                            "<option ng-repeat='product in products' value='{{product.ProductName}}'>{{product.ProductName}}</option>" +
                                        "</select>" +
                                    "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td colspan='2'><button type='submit' class='btn btn-primary' ng-disabled='itemEditForm.$invalid'> Update </button> " +
                                        "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                                "</tr>" +
                            "</table>" +
                        "</form>",
                    plain: true,
                    scope: $scope
                })
            });
        };

        $scope.UpdateItem = function (item, productName) {
            $http({
                method: 'post',
                url: '/Item/UpdateItem',
                data: { item: item, productName: productName }
            }).then(function (response) {
                if (response.statusText == "OK") {
                    alert(response.data);
                    location.reload();
                }
            })
        };

        $scope.deleteItem = function (itemId) {
            ngDialog.openConfirm({
                template:
                    '<div>' +
                    '<p>Are you sure you want to delete selected conversation(s) ?</p>' +
                      '<button type="button" class="btn btn-primary" ng-click="closeThisDialog()">No</button> &nbsp;' +
                      '<button type="button" class="btn btn-primary" ng-click="confirm()">Yes' +
                    '</button>' +
                    '</div>',
                plain: true,
                className: 'ngdialog-theme-default'
            }).then(function () {
                $http({
                    method: 'post',
                    url: '/Item/DeleteItemByItemId',
                    params: { itemId: JSON.stringify(itemId) }
                }).then(function (response) {
                    if (response.statusText == "OK") {
                        alert(response.data);
                        location.reload();
                    }
                })
            });
           
        };
    }
})();