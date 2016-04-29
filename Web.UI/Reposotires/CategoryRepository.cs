using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Reposotires
{
    public class CategoryRepository : Controller, ICategoryRepository
    {
        private readonly CMSDBContext db;

        public CategoryRepository(CMSDBContext db)
        {
            this.db = db;
        }

        public IQueryable<Category> GetProductCategory()
        {
            return db.Categories;
        }

        protected override void Dispose(bool disposing)
        {
            if(disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}