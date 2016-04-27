using System.Linq;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Reposotires
{
    public class AdminRepository : Controller, IAdminProfileRepository
    {
        private readonly CMSDBContext db;

        public AdminRepository(CMSDBContext db)
        {
            this.db = db;
        }

        public AdminProfile LoginValidation(string userId)
        {
            return db.AdminProfiles.FirstOrDefault(p => p.userId == userId);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }
    }
}