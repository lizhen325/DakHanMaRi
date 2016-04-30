using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.UI.Models;

namespace Web.UI.Interfaces
{
    public interface IItemsRepository
    {
        IQueryable<Item> GetItemsByProductId(int productId);
        Item GetItemByItemId(int itemId);
        string UpdateItem(Item item, string productName);
        string DeleteItemByItemId(int itemId);
        string AddItem(Item item, string productName);
    }
}
