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

        public IQueryable<Employee> GetAllEmployees()
        {
            return db.Employees;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}