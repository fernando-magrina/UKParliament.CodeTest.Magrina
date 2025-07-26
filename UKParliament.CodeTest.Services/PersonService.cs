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

        return new Person
        {
            Id = person.Id,
            FirstName = person.FirstName,
            LastName = person.LastName,
            DOB = person.DOB,
            Department = person.Department
        };
    }

    public async Task<List<Person>> GetPeopleAsync()
    {
        var people = await this.context.People
               .Include(p => p.Department)
               .ToListAsync();

        if (people == null)
            throw new KeyNotFoundException($"No people found.");

        return people.Select(p => new Person
        {
            Id = p.Id,
            FirstName = p.FirstName,
            LastName = p.LastName,
            DOB = p.DOB,
            Department = p.Department,
        }).ToList();
    }
}