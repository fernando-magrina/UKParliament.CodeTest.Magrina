using Microsoft.EntityFrameworkCore;

using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services.Interfaces;

namespace UKParliament.CodeTest.Services;

public class DepartmentService : IDepartmentService
{
    private readonly PersonManagerContext context;

    public DepartmentService(PersonManagerContext context)
    {
        this.context = context;
    }

    public async Task<Department?> GetDepartmentByIdAsync(int id)
    {
        var person = await this.context.Departments.FindAsync(id);

        if (person == null)
            throw new KeyNotFoundException($"Department with ID {id} not found.");

        return new Department
        {
            Id = person.Id,
            Name = person.Name,
        };
    }

    public async Task<List<Department>> GetDepartmentsAsync()
    {
        var people = await this.context.Departments.ToListAsync();

        if (people == null)
            throw new KeyNotFoundException($"No Department found.");

        return people.Select(p => new Department
        {
            Id = p.Id,
            Name = p.Name,
        }).ToList();
    }
}