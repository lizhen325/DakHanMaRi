using System.Web;
using System.Web.Optimization;

namespace Web.UI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //angular
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/Venders/angular.js",
                        "~/Scripts/Venders/angular-route.js",
                        "~/Scripts/Venders/ngDialog.js",
                        "~/Scripts/Router/route-config.js",
                        "~/Scripts/filters/Date-Filter.js",
                        "~/Scripts/Controllers/EmployeeController.js",
                        "~/Scripts/Controllers/CategoryController.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/ngDialog-theme-default.css",
                      "~/Content/ngDialog.css",
                      "~/Content/ngDialog.min.css"));
        }
    }
}
