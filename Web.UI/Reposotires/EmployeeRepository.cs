using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Reposotires
{
    public class EmployeeRepository : Controller, IEmployeeRepository
    {
        private readonly CMSDBContext db;

        public EmployeeRepository(CMSDBContext db)
        {
            this.db = db;
        }

        public string AddEmployee(Employee employee)
        {
            if(employee != null)
            {
                employee.DelFlag = 0;
                employee.JoinAt = DateTime.Now;
                employee.TotalHourPerWeek = 0;
                db.Employees.Add(employee);
                db.SaveChanges();
                return "Employee record added successfully";
            }
            else
            {
                return "Invalid employee record";
            }
        }

        public IQueryable<Employee> GetAllEmployees()
        {
            return db.Employees.Where(e => e.DelFlag == 0);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}