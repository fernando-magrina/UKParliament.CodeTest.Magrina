using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Data.Repositories.Interfaces;
using UKParliament.CodeTest.Services.Interfaces;

namespace UKParliament.CodeTest.Services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository repository;

    public DepartmentService(IDepartmentRepository repository)
    {
        this.repository = repository;
    }

    public async Task<List<Department>> GetDepartmentsAsync()
    {
        var data = await repository.GetDepartmentsAsync();
        if (data == null) throw new KeyNotFoundException("No Department found.");
        return data.Select(p => new Department { Id = p.Id, Name = p.Name }).ToList();
    }
}
