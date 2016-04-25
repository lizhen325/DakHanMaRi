using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web.UI.Models;

namespace Web.UI.API
{
    public class PracticeController : ApiController
    {
        private CMSDBContext db = new CMSDBContext();

        [Route("api/Practice/Get/{userId}")]
        public AdminProfile Get(string userId)
        {
            return
                db.AdminProfiles.FirstOrDefault(p => p.userId == userId);
        }
    }
}
