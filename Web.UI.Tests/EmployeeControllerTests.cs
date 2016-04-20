using Moq;
using NUnit.Framework;
using Web.UI.Interfaces;
using Web.UI.Controllers;
using Web.UI.Models;
using System.Collections.Generic;
using System.Linq;

namespace Web.UI.Tests
{
    [TestFixture]
    public class EmployeeControllerTests
    {
        private Mock<IEmployeeRepository> mockEmployeeRepository;
        private EmployeeController employeeController;

        [SetUp]
        public void SetUpTest()
        {
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
        public void Test_List_Of_Employees()
        {
            List<Employee> mockEmployees = new List<Employee>();
            mockEmployees.Add(new Employee() { Id = 1, Name = "Lizhen" });
            mockEmployeeRepository.Setup(m => m.GetAllEmployees()).Returns(mockEmployees.AsQueryable);
            var result = employeeController.Index();
            var employees = (IQueryable<Employee>)result.ViewData.Model;
            Assert.AreEqual(employees.Count(), mockEmployees.Count());
        }
        
        [TearDown]
        public void TearDown()
        {
            mockEmployeeRepository = null;
            employeeController = null;
        }
    }
}
