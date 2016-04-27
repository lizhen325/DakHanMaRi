﻿using System.Data.Entity;

namespace Web.UI.Models
{
    public class CMSDBContext : DbContext
    {
        public CMSDBContext() : base("name=CMSDB") { }

        public virtual IDbSet<Employee> Employees { get; set; }
        public virtual IDbSet<AdminProfile> AdminProfiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<AdminProfile>().ToTable("AdminProfiles");
        }
    }
}