﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
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

        public string DeleteEmployeeById(int id)
        {
            Employee employee = db.Employees.Find(id);
            if(employee != null)
            {
                employee.DelFlag = 1;
                employee.LeaveAt = DateTime.Now;
                db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return "Selected Employee record deleted sucessfully";
            }
            return "Invalid Operation";
        }

        public Employee GetEmployeeById(int id)
        {
            return db.Employees.Where(e => e.Id == id).FirstOrDefault();
        }

        public IQueryable<Employee> GetEmployeesByDelflag()
        {
            return db.Employees.Where(e => e.DelFlag == 0);
        }

        public string UpdateEmployee(Employee employee)
        {
            if(employee != null)
            {
                employee.DelFlag = 0;
                db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return "Employee record updated succesfully";
            }
            return "Invalid employee record";
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}