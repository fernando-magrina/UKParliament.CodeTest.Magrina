namespace UKParliament.CodeTest.Data.Repositories.Interfaces
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllPeopleDataAsync();
        Task<bool> AddAsync(Person person);
        Task<bool> UpdatePersonDataAsync(Person person);
    }
}
