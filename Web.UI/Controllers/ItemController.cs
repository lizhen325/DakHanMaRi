using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;

namespace Web.UI.Controllers
{
    public class ItemController : BaseController
    {
        private IItemsRepository _itemRepository;

        public ItemController(IItemsRepository itemRepository)
        {
            this._itemRepository = itemRepository;
        }

        // GET: Item
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetItemsByProductId(int productId)
        {
            return Json(_itemRepository.GetItemsByProductId(productId), JsonRequestBehavior.AllowGet);
        }
    }
}