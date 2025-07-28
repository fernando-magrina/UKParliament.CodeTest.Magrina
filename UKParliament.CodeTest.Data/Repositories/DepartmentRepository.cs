using Microsoft.EntityFrameworkCore;

using UKParliament.CodeTest.Data.Repositories.Interfaces;

namespace UKParliament.CodeTest.Data.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly PersonManagerContext context;

        public DepartmentRepository(PersonManagerContext context)
        {
            this.context = context;
        }

        public async Task<List<Department>> GetDepartmentsAsync()
        {
            var department = await this.context.Departments.ToListAsync();

            if (department == null)
                throw new KeyNotFoundException($"No Department found.");

            return department.ToList();
        }
    }
}
