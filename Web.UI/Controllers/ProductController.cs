using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;

namespace Web.UI.Controllers
{
    public class ProductController : BaseController
    {
        private IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            this._productRepository = productRepository;
        }

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProductsByCategoryId(int categoryId)
        {
            return Json(_productRepository.GetProductsByCategoryId(categoryId),JsonRequestBehavior.AllowGet);
        }
    }
}