using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services.Interfaces;

public interface IDepartmentService
{
    Task<List<Department>> GetDepartmentsAsync();
}