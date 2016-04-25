/// <reference path="../Venders/angular.js" />
/// <reference path="D:\Asp.Net\DAKHANMARI\Web.UI\Views/Employee/Index.cshtml" />
'user strict'
angular.module('DakHanMaRi')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/Employee', {
                    templateUrl: 'Views/Employee/Index.cshtml'
                })
                .when('/Login/Index', {
                    templateUrl: 'Views/Login/Index.cshtml',
                });
        })