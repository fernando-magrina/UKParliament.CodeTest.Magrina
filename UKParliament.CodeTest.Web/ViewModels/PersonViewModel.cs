using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Web.ViewModels;

public class PersonViewModel
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly DOB { get; set; }
    public Department Department { get; set; }
}