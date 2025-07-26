using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services.Interfaces;

public interface IPersonService
{
    Task<Person?> GetByIdAsync(int id);

    Task<List<Person>> GetPeopleAsync();
}