/// <reference path="../Venders/angular.js" />
(function () {
    'use strict';
    angular.module('DakHanMaRi')
           .controller('EmployeeController',function EmployeeController($scope, $http) {
               $http({
                   method: 'GET',
                   url: '/Employee/GetEmployeesByDelflag',
               }).then(function (response) {
                   $scope.employees = response.data;
               })
           });
})();

