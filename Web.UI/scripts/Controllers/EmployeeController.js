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
        $scope.openAddDialog = function () {
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

        //Json Date convert to yyyy-MM-dd
        var dateFormat = function (date) {
            var a = new Date(parseInt(date.substr(6)));
            var month = a.getMonth() + 1;
            var year = a.getFullYear();
            var day = a.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }
            return year + "-" + month + "-" + day;
        }
        
        //Edit Employee
        $scope.Edit = function (id) {
            $http({
                method: 'GET',
                url: '/Employee/GetEmployeeById',
                params: { Id: JSON.stringify(id) },
            }).then(function (response) {
                
                $scope.employee = response.data;
                $scope.birthDay = dateFormat(response.data.Birthday);
                ngDialog.openConfirm({

                    template:
                        "<form align='center' novalidate name='employeeEditForm' ng-submit='EditEmployee(response.data)'>" +
                         "<table class='table'>" +
                             "<h2>Add Employee</h2>" +
                             "<tr>" +
                                 "<td><label for='name'> Name: </label>" + "</td>" +
                                 "<td><input type='text' name='name' placeholder='Name' ng-model='employee.Name' required/> </td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.name.$error.required && employeeEditForm.name.$touched'>required</td>" +
                             "</tr>" +
                             "<tr>" +
                                 "<td><label for='name'> Phone: </label></td>" +
                                 "<td><input type='text' name='phone' placeholder='Phone' ng-model='employee.Phone' required/></td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.phone.$error.required && employeeEditForm.phone.$touched'>required</td>" +
                             "</tr>" +
                             "<tr>" +
                                 "<td><label for='name'> BirthDay: </label></td>" +
                                 "<td><input type='text' name='birthday' placeholder='BirthDay'  ng-pattern='/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/' ng-model='birthDay' required/></td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.birthday.$error.pattern && employeeEditForm.birthday.$touched'><small>YYY-MM-dd</small></td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.birthday.$error.required && employeeEditForm.birthday.$touched'>required</td>" +
                             "</tr>" +
                             "<tr>" +
                                 "<td><label for='name'> SalaryPerHour: </label></td>" +
                                 "<td><input type='text' placeholder='SalaryPerHour' ng-model='employee.SalaryPerHour' value='employee.SalaryPerHour'/></td>" +
                             "</tr>" +
                             "<tr>" +
                              "<td colspan='2'><button type='submit' class='btn btn-primary' ng-disabled='employeeEditForm.$invalid'> Update </button> " +
                                 "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                             "</tr>" +
                         "</table>" +
                        "</form>",
                    plain: true,
                    scope: $scope
                });
            })
        }

    };
})();

