using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;

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
            return View("Index",_employeeRepository.GetAllEmployees());
        }
    }
}