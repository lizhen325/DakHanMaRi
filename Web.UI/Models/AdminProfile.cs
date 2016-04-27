using System.ComponentModel.DataAnnotations;

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