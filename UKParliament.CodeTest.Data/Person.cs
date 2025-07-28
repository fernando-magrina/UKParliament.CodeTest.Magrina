namespace UKParliament.CodeTest.Data;

public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public DateOnly DOB { get; set; }
    public string Email { get; set; }

    public int DepartmentId { get; set; }
    public Department Department { get; set; } = default!;
}