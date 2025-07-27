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