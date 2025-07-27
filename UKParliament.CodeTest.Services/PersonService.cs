using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Data.Repositories.Interfaces;
using UKParliament.CodeTest.Services.Interfaces;

namespace UKParliament.CodeTest.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository personRepository;
    private readonly IDepartmentRepository depotRepository;

    public PersonService(IPersonRepository personRepository, IDepartmentRepository depotRepository)
    {
        this.personRepository = personRepository;
        this.depotRepository = depotRepository;
    }

    public async Task<List<Person>> GetPeopleAsync()
    {
        var people = await this.personRepository.GetAllPeopleDataAsync();

        if (people == null)
            throw new KeyNotFoundException($"No people found.");

        return people.ToList();
    }

    public async Task<bool> UpdatePersonAsync(Person person)
    {
        return await this.personRepository.UpdatePersonDataAsync(person);
    }

    public async Task<bool> AddPersonAsync(Person person)
    {
        person.DepartmentId = person.Department.Id;
        person.Department = null;

        var addedPerson = await this.personRepository.AddAsync(person);
        return true;
    }
}