using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.UI.Models
{
    public class AdminProfile
    {
        [Key]
        public int Id { get; set; }
        public string userId { get; set; }
        public string Password { get; set; }
    }
}