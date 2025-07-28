namespace UKParliament.CodeTest.Data.Repositories.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetDepartmentsAsync();
    }
}
