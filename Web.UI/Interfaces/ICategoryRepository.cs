﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.UI.Models;

namespace Web.UI.Interfaces
{
    public interface ICategoryRepository
    {
        IQueryable<Category> GetProductCategory();
    }
}
