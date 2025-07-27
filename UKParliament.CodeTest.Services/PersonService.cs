using Microsoft.EntityFrameworkCore;

using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services.Interfaces;

namespace UKParliament.CodeTest.Services;

public class PersonService : IPersonService
{
    private readonly PersonManagerContext context;

    public PersonService(PersonManagerContext context)
    {
        this.context = context;
    }

    public async Task<Person?> GetByIdAsync(int id)
    {
        var person = await this.context.People.FindAsync(id);

        if (person == null)
            throw new KeyNotFoundException($"Person with ID {id} not found.");

        return person;
    }

    public async Task<List<Person>> GetPeopleAsync()
    {
        var people = await this.context.People
               .Include(p => p.Department)
               .ToListAsync();

        if (people == null)
            throw new KeyNotFoundException($"No people found.");

        return people.ToList();
    }

    public async Task<bool> UpdatePersonAsync(Person person)
    {
        this.context.People.Update(person);
        var updatedPerson = await this.context.SaveChangesAsync();

        return updatedPerson > 0;
    }

    public async Task<bool> AddPersonAsync(Person person)
    {
        if (person.Department != null)
        {
            var existingDept = await context.Departments.FindAsync(person.Department.Id);
            person.Department = existingDept;
        }

        this.context.People.Add(person);
        var addedPerson = await this.context.SaveChangesAsync();
        return true;
    }
}