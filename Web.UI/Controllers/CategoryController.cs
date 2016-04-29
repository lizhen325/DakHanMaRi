using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;

namespace Web.UI.Controllers
{
    public class CategoryController : BaseController
    {
        ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            this._categoryRepository = categoryRepository;
        }
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProductCategory()
        {
            return Json(_categoryRepository.GetProductCategory(), JsonRequestBehavior.AllowGet);
        }
    }
}