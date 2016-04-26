/// <reference path="../Venders/angular.js" />
(function () {
    'use strict';
    angular.module('DakHanMaRi')
           .controller('EmployeeController', EmployeeController)
    EmployeeController.$inject = ["$scope", "$http", "ngDialog"];
           function EmployeeController($scope, $http, ngDialog) {
               $http({
                   method: 'GET',
                   url: '/Employee/GetEmployeesByDelflag',
               }).then(function (response) {
                   $scope.employees = response.data;
               });
               $scope.openDialog = function () {
                   ngDialog.openConfirm({
                       template:
                           "<form align='center'> " +
                            "<table class='table'>" +
                                "<h2>Add Employee</h2>" +
                                "<tr>" +
                                    "<td><label for='name'> Name: </label>" + "</td>" +
                                    "<td><input type='text' placeholder='Name'/> </td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> Phone: </label></td>" +
                                    "<td><input type='text' placeholder='Phone'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> BirthDay: </label></td>" +
                                    "<td><input type='text' placeholder='BirthDay'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> JoinTime: </label></td>" +
                                    "<td><input type='text' placeholder='JoinTime'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> SalaryPerHour: </label></td>" +
                                    "<td><input type='text' placeholder='SalaryPerHour'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                 "<td colspan='2'><input type='submit' value='Add' class='btn btn-primary'/> " +
                                    "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                                "</tr>"+
                            "</table>" +
                           "</form>",
                       plain: true,
                       scope: $scope
                   }).then(function (value) {
                       console.log(value);
                   }, function (reject) {
                       console.log(reject);
                   });
               };
           };
})();

