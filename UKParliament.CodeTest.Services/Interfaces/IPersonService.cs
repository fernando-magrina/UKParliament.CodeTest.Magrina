using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services.Interfaces;

public interface IPersonService
{
    Task<List<Person>> GetPeopleAsync();

    Task<bool> UpdatePersonAsync(Person person);

    Task<bool> AddPersonAsync(Person person);
}