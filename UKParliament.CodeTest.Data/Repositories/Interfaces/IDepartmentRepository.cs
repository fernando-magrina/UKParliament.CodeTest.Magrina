namespace UKParliament.CodeTest.Data.Repositories.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<Department?> GetDepartmentByIdAsync(int id);
        Task<List<Department>> GetDepartmentsAsync();
    }
}
