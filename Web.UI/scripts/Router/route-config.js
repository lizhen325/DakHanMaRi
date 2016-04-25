/// <reference path="../Venders/angular.js" />
(function () {
    'user strict';
    angular.module('DakHanMaRi', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/Home', {
                    templateUrl: '/Home/Index'
                })
                .when('/Employee', {
                    templateUrl: '/Employee/Index'
                })
                .otherwise({
                    redirectTo: '/'
                })
        })
})();
