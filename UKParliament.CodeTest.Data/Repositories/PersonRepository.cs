using Microsoft.EntityFrameworkCore;

using UKParliament.CodeTest.Data.Repositories.Interfaces;

namespace UKParliament.CodeTest.Data.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly PersonManagerContext context;

        public PersonRepository(PersonManagerContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Person>> GetAllPeopleDataAsync()
        {
            return await this.context.People
               .Include(p => p.Department)
               .ToListAsync(); ;
        }

        public async Task<bool> UpdatePersonDataAsync(Person person)
        {
            this.context.People.Update(person);
            var updatedPerson = await this.context.SaveChangesAsync();
            return updatedPerson > 0;
        }

        public async Task<bool> AddAsync(Person person)
        {
            this.context.People.Add(person);
            var addedPerson = await this.context.SaveChangesAsync();
            return addedPerson > 0;
        }
    }
}