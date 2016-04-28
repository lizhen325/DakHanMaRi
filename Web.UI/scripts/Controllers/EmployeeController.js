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
                    "<form align='center' novalidate name='employeeForm' ng-submit='addEmployee(employeeAdd)'>" +
                     "<table class='table'>" +
                         "<h2>Add Employee</h2>" +
                         "<tr>" +
                             "<td><label for='name'> Name: </label>" + "</td>" +
                             "<td><input type='text' name='name' placeholder='Name' ng-model='employeeAdd.Name' required/> </td>" +
                             "<td style='color:red;' ng-show='employeeForm.name.$error.required && employeeForm.name.$touched'>required</td>" +
                         "</tr>" +
                         "<tr>" +
                             "<td><label for='name'> Phone: </label></td>" +
                             "<td><input type='text' name='phone' placeholder='Phone' ng-model='employeeAdd.Phone' required/></td>" +
                             "<td style='color:red;' ng-show='employeeForm.phone.$error.required && employeeForm.phone.$touched'>required</td>" +
                         "</tr>" +
                         "<tr>" +
                             "<td><label for='name'> BirthDay: </label></td>" +
                             "<td><input type='text' name='birthday' placeholder='BirthDay' ng-pattern='/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/' ng-model='employeeAdd.BirthDay' required/></td>" +
                             "<td style='color:red;' ng-show='employeeForm.birthday.$error.pattern && employeeForm.birthday.$touched'><small>YYY-MM-dd</small></td>" +
                             "<td style='color:red;' ng-show='employeeForm.birthday.$error.required && employeeForm.birthday.$touched'>required</td>" +
                         "</tr>" +
                         "<tr>" +
                             "<td><label for='name'> SalaryPerHour: </label></td>" +
                             "<td><input type='text' placeholder='SalaryPerHour' ng-model='employeeAdd.SalaryPerHour'/></td>" +
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
                $scope.Birthday = dateFormat(response.data.Birthday);
                ngDialog.openConfirm({
                    template:
                        "<form align='center' novalidate name='employeeEditForm' ng-submit='EditEmployee(employee)'>" +
                         "<table class='table'>" +
                             "<h2>Edit Employee</h2>" +
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
                                 "<td><input type='text' name='birthday' placeholder='BirthDay'  ng-pattern='/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/' ng-model='Birthday' required/></td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.birthday.$error.pattern && employeeEditForm.birthday.$touched'><small>YYY-MM-dd</small></td>" +
                                 "<td style='color:red;' ng-show='employeeEditForm.birthday.$error.required && employeeEditForm.birthday.$touched'>required</td>" +
                             "</tr>" +
                             "<tr>" +
                                 "<td><label for='name'> SalaryPerHour: </label></td>" +
                                 "<td><input type='text' placeholder='SalaryPerHour' ng-model='employee.SalaryPerHour'/></td>" +
                             "</tr>" +
                             "<tr>" +
                                 "<td><label for='name'> DailyWorkHours: </label></td>" +
                                 "<td><input type='text' placeholder='SalaryPerHour' ng-model='employee.DailyWorkHours' /></td>" +
                             "</tr>" +
                              "<tr>" +
                                "<td><label for='name'> TotalHourPerWeek: </label></td>" +
                                "<td><input type-'text' ng-model='employee.TotalHourPerWeek'/></td>" +
                             "</tr>" +
                             "<tr>" +
                              "<td colspan='2'><button type='submit' class='btn btn-primary' ng-disabled='employeeEditForm.$invalid'> Update </button> " +
                                 "<input type='reset' value='reset' class='btn btn-info'/> </td>" +
                             "</tr>" +                            
                             "<input type='hidden' ng-model='employee.JoinAt'/>" +
                             "<input type='hidden' ng-model='employee.id'/>" +
                         "</table>" +
                        "</form>",
                    plain: true,
                    scope: $scope
                });

                $scope.EditEmployee = function (employee) {
                    var employeeUpdate = {
                        "Delflag": 0,
                        "Name": employee.Name,
                        "Phone": employee.Phone,
                        "TotalHourPerWeek": employee.TotalHourPerWeek,
                        "SalaryPerHour": employee.SalaryPerHour,
                        "Id" : id,
                        "Birthday": dateFormat(employee.Birthday),
                        "JoinAt": dateFormat(employee.JoinAt),
                        "DailyWorkHours":employee.DailyWorkHours
                    };
                    $http({
                        method: 'post',
                        url: '/Employee/UpdateEmployee',
                        data: employeeUpdate,
                    }).then(function (response) {
                        if (response.statusText == "OK") {
                            alert(response.data);
                            location.reload();
                        }
                    });
                }
            });

        }

        //Delete Employee
        $scope.Delete = function (id) {
            ngDialog.openConfirm({
                template:
                    '<div>' +
                    '<p>Are you sure you want to delete selected conversation(s) ?</p>' +
                      '<button type="button" class="btn btn-primary" ng-click="closeThisDialog()">No</button> &nbsp;' +
                      '<button type="button" class="btn btn-primary" ng-click="confirm()">Yes' +
                    '</button>' +
                    '</div>',
                plain: true,
                className: 'ngdialog-theme-default'
            }).then(function () {
                $http({
                    method: 'post',
                    url: '/Employee/DeleteEmployeeById',
                    params:{Id:JSON.stringify(id)},
                }).then(function (response) {
                    if (response.statusText == "OK") {
                        alert(response.data);
                        location.reload();
                    }
                })
            });
        }

    };
})();

