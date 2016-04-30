using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
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

        public string DeleteItemByItemId(int itemId)
        {
            var item = db.Items.Find(itemId);
            if(item != null)
            {
                db.Entry(item).State = EntityState.Deleted;
                db.SaveChanges();
                return "Selected Employee record deleted sucessfully";
            }
            return "Invalid Operation";
        }

        public Item GetItemByItemId(int itemId)
        {
            return db.Items.Where(i => i.ItemId == itemId).FirstOrDefault();
        }

        public IQueryable<Item> GetItemsByProductId(int productId)
        {
            return db.Items.Where(i => i.ProductId == productId);
        }

        public string UpdateItem(Item item, string productName)
        {
            if(!string.IsNullOrEmpty(productName) && item != null)
            {
                var productId =  db.Products.Where(p => p.ProductName == productName).FirstOrDefault().ProductId;
                item.ProductId = productId;
                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return "Item record updated succesfully";
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