using System.Linq;
using Web.UI.Models;

namespace Web.UI.Interfaces
{
    public interface IEmployeeRepository
    {
        IQueryable<Employee> GetEmployeesByDelflag();
        string AddEmployee(Employee employee);
        Employee GetEmployeeById(int id);
        string UpdateEmployee(Employee employee);
        string DeleteEmployeeById(int id);
    }
}
