/// <reference path="../Venders/angular.js" />
(function () {
    'use strict';
    angular.module('DakHanMaRi')
           .controller('EmployeeController', EmployeeController)
    EmployeeController.$inject = ["$scope", "$http", "ngDialog"];
    function EmployeeController($scope, $http, ngDialog) {
        //get all employees
        $http({
            method: 'GET',
            url: '/Employee/GetEmployeesByDelflag',
        }).then(function (response) {
            $scope.employees = response.data;
        });
        
        //dialog
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
                             "<td><input type='text' name='birthday' placeholder='BirthDay' ng-pattern='/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/' ng-model='employee.BirthDay' required/></td>" +
                             "<td style='color:red;' ng-show='employeeForm.birthday.$error.pattern && employeeForm.birthday.$touched'><small>YYY-MM-dd</small></td>" +
                             "<td style='color:red;' ng-show='employeeForm.birthday.$error.required && employeeForm.birthday.$touched'>required</td>" +
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

            //add employee
            $scope.addEmployee = function (employee) {
                $http({
                    method: 'post',
                    url: '/Employee/AddEmployee',
                    data: JSON.stringify(employee),
                    dataType: 'json'
                }).then(function (response) {
                    if (response.statusText == 'OK') {
                        alert(response.data);
                        location.reload();
                    }
                });
            };
        };
    };
})();

