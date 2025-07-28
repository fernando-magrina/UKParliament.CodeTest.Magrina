using System.ComponentModel.DataAnnotations;

using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Web.ViewModels;

public class PersonViewModel
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public DateOnly DOB { get; set; }
    [Required]
    public Department Department { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }

}