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
                           "<form align='center' novalidate name='employeeForm' ng-submit='addEmployee(employee)'>" +
                            "<table class='table'>" +
                                "<h2>Add Employee</h2>" +
                                "<tr>" +
                                    "<td><label for='name'> Name: </label>" + "</td>" +
                                    "<td><input type='text' name='name' placeholder='Name' ng-model='employee.Name' required/> </td>" +
                                    "<td style='color:red;' ng-show='employeeForm.name.$error.required && employeeForm.name.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> Phone: </label></td>" +
                                    "<td><input type='text' name='phone' placeholder='Phone' ng-model='employee.Phone' required/></td>" +
                                    "<td style='color:red;' ng-show='employeeForm.phone.$error.required && employeeForm.phone.$touched'>required</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> BirthDay: </label></td>" +
                                    "<td><input type='text' placeholder='BirthDay' ng-model='employee.BirthDay'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> JoinTime: </label></td>" +
                                    "<td><input type='text' placeholder='JoinTime' ng-model='employee.JoinTime'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><label for='name'> SalaryPerHour: </label></td>" +
                                    "<td><input type='text' placeholder='SalaryPerHour' ng-model='employee.SalaryPerHour'/></td>" +
                                "</tr>" +
                                "<tr>" +
                                 "<td colspan='2'><button type='submit' class='btn btn-primary' ng-disabled='employeeForm.$invalid'> Add </button> " +
                                    "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                                "</tr>" +
                            "</table>" +
                           "</form>",
                       plain: true,
                       scope: $scope
                   });

                   $scope.addEmployee = function (employee) {
                       console.log(employee);
                   };
               };
           };
})();

