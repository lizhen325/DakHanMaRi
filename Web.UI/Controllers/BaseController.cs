using System.Web.Mvc;

namespace Web.UI.Controllers
{
    public class BaseController : Controller
    {
        // GET: Base
        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            if(Session["user"] == null)
            {
                filterContext.HttpContext.Response.Redirect("/Home/Index");
                return;
            }
        }
    }
}