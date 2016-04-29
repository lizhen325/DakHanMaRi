/// <reference path="../Venders/angular.js" />
(function () {
    'user strict';
    angular.module('DakHanMaRi', ['ngRoute', 'ngDialog'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/Home', {
                    templateUrl: '/Home/Index'
                })
                .when('/Employee', {
                    templateUrl: '/Employee/Index'
                })
                .when('/Product', {
                    templateUrl: '/Product/Index'
                })
                .otherwise({
                    redirectTo: '/'
                })
        })
})();
