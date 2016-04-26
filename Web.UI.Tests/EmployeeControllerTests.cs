using System;
using Moq;
using NUnit.Framework;
using Web.UI.Interfaces;
using Web.UI.Controllers;
using Web.UI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Web.UI.Tests
{
    [TestFixture]
    public class EmployeeControllerTests
    {
        private Mock<IEmployeeRepository> mockEmployeeRepository;
        private EmployeeController employeeController;
        private List<Employee> employee;

        [SetUp]
        public void SetUpTest()
        {
            employee = new List<Employee>(){
                new Employee(){Id=1, Name="Lizhen" },
                new Employee(){Id=2, Name="Jin" },
                new Employee(){Id=3, Name="SoDam" },
            };
            mockEmployeeRepository = new Mock<IEmployeeRepository>();
            employeeController = new EmployeeController(mockEmployeeRepository.Object);
        }


        [Test]
        public void Test_EmployeeController_ViewName_Should_Be_Equal()
        {
            var result = employeeController.Index();
            Assert.AreEqual("Index", result.ViewName);
        }

        [Test]
        public void Test_Count_List_Of_Employees()
        {
            mockEmployeeRepository.Setup(m => m.GetEmployeesByDelflag()).Returns(employee.AsQueryable);
            var expected = employeeController.GetEmployeesByDelflag().Data as IQueryable<Employee>;
            Assert.AreEqual(expected.Count(), mockEmployeeRepository.Object.GetEmployeesByDelflag().Count());
        }

        [Test]
        public void Test_Add_Employee()
        {
            Employee employee = new Employee() { Id = 2, Name = "Jin", DelFlag = 0, Phone = "123" };
            mockEmployeeRepository.Setup(m => m.AddEmployee(employee)).Returns("OK");
            var expected = employeeController.AddEmployee(employee) as ContentResult;
            Assert.AreEqual(expected.Content, mockEmployeeRepository.Object.AddEmployee(employee));
        }

        [TearDown]
        public void TearDown()
        {
            mockEmployeeRepository = null;
            employeeController = null;
        }
    }
}
