using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services.Interfaces;

public interface IDepartmentService
{
    Task<Department?> GetDepartmentByIdAsync(int id);

    Task<List<Department>> GetDepartmentsAsync();
}