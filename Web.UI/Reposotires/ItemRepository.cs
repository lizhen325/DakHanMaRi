using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Reposotires
{
    public class ItemRepository :Controller, IItemsRepository
    {
        private readonly CMSDBContext db;

        public ItemRepository(CMSDBContext db)
        {
            this.db = db;
        }

        public Item GetItemByItemId(int itemId)
        {
            return db.Items.Where(i => i.ItemId == itemId).FirstOrDefault();
        }

        public IQueryable<Item> GetItemsByProductId(int productId)
        {
            return db.Items.Where(i => i.ProductId == productId);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}