using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

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

        public ActionResult GetItemByItemId(int itemId)
        {
            return Json(_itemRepository.GetItemByItemId(itemId), JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateItem(Item item, string productName)
        {
            return Json(_itemRepository.UpdateItem(item, productName));
        }

        public ActionResult DeleteItemByItemId(int itemId)
        {
            return Json(_itemRepository.DeleteItemByItemId(itemId));
        }
    }
}