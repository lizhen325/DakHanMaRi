using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Reposotires
{
    public class ProductRepository : Controller, IProductRepository
    {
        private readonly CMSDBContext db;

        public ProductRepository(CMSDBContext db)
        {
            this.db = db;
        }

        public IQueryable<Product> GetProductsByCategoryId(int categoryId)
        {
            return db.Products.Where(p => p.CategoryId == categoryId);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}