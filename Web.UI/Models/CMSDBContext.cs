using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Web.UI.Models
{
    public class CMSDBContext : DbContext
    {
        public CMSDBContext() : base("name=CMSDB") { }

        public virtual IDbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>().ToTable("Employees");
        }
    }
}