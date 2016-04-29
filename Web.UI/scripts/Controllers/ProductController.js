/// <reference path="../Venders/angular.js" />
(function () {
    'use strict';
    angular.module('DakHanMaRi')
            .controller('ProductController', ProductController)
    ProductController.$inject = ['$scope', '$http', 'ngDialog'];
    function ProductController($scope, $http, ngDialog) {

    }
})();