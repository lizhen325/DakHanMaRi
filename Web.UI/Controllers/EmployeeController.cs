using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Controllers
{
    public class EmployeeController : BaseController
    {
        IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            this._employeeRepository = employeeRepository;
        }
        // GET: Employee
        public ViewResult Index()
        {
            return View("Index");
        }

        // GET: Employee
        public JsonResult GetEmployeesByDelflag()
        {
            var employee = _employeeRepository.GetEmployeesByDelflag();
            return Json(employee, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddEmployee(Employee employee)
        {
            return Content(_employeeRepository.AddEmployee(employee));
        }

        public JsonResult GetEmployeeById(int id)
        {
            return Json(_employeeRepository.GetEmployeeById(id), JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateEmployee(Employee employee)
        {
            return Json(_employeeRepository.UpdateEmployee(employee));
        }
    }
}