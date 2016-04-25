/// <reference path="../Venders/angular.js" />
angular.module('DakHanMaRi', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/index', {
                    templateUrl:'/Home/Index'
                })
                .when('/Employee', {
                    templateUrl: '/Employee/Index'
                })
                .when('/Login', {
                    templateUrl: '/Login/Index',
                    controller:'LoginController'
                })
                .when('/Home', {
                    templateUrl: '/Home/Index'
                })
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        });