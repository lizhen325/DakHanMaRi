using System;
using System.Web;
using System.Web.Mvc;
using Web.UI.Interfaces;
using Web.UI.Models;

namespace Web.UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IAdminProfileRepository adminProfileRepository;

        public HomeController(IAdminProfileRepository adminProfileRepository)
        {
            this.adminProfileRepository = adminProfileRepository;
        }
        // GET: Home
        public ActionResult Index()
        {
            CheckCookie();
            return View();
        }

        [HttpPost]
        public JsonResult GetAdminProfileByUserId(string userId)
        {            
            var adminProfile = adminProfileRepository.LoginValidation(userId);
            if(adminProfile != null)
            {
                SetCookie(adminProfile);
                Session["user"] = adminProfile.userId.ToString();
            }
            return Json(adminProfile);
        }            
        
        private void SetCookie(AdminProfile adminProfile)
        {
            HttpCookie cookieName = new HttpCookie("userId", adminProfile.userId);
            HttpCookie cookiePasswod = new HttpCookie("password", adminProfile.Password);
            cookieName.Expires = DateTime.Now.AddDays(3);
            cookiePasswod.Expires = DateTime.Now.AddDays(3);
            Response.Cookies.Add(cookieName);
            Response.Cookies.Add(cookiePasswod);
        }

        private void CheckCookie()
        {
            if (Request.Cookies["userId"] != null && Request.Cookies["password"] != null)
            {
                string userName = Request.Cookies["userId"].Value;
                string password = Request.Cookies["password"].Value;
                var admin = adminProfileRepository.LoginValidation(userName);
                if (admin != null)
                {
                    if (password == admin.Password)
                    {
                        Session["user"] = admin.userId.ToString();
                        Response.Redirect("/Employee/Index");
                    }
                    Response.Cookies["userId"].Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies["password"].Expires = DateTime.Now.AddDays(-1);
                }
            }
        }
    }
}