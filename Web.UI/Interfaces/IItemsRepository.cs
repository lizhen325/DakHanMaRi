﻿using System;
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
    }
}
