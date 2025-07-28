using Moq;

using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Data.Repositories.Interfaces;
using UKParliament.CodeTest.Services;

using Xunit;

namespace UKParliament.CodeTest.Tests
{
    public class PersonServiceTests
    {
        private readonly Mock<IPersonRepository> _repoMock = new Mock<IPersonRepository>();
        private readonly PersonService _service;

        private readonly Person person = new Person
        {
            Id = 1,
            FirstName = "Jane",
            LastName = "Smith",
            Email = "jane@example.com",
            DOB = DateOnly.FromDateTime(DateTime.Now),
            Department = new Department { Id = 1, Name = "Sales" }
        };

        public PersonServiceTests()
        {
            _service = new PersonService(_repoMock.Object);
        }

        [Fact]
        public async Task GetPeopleAsync_ShouldReturnList_WhenDataExists()
        {
            // Arrange
            var peopleList = new List<Person>
            {
                new Person { Id = 1, FirstName = "Alice", LastName = "Smith" }
            };

            _repoMock.Setup(r => r.GetAllPeopleDataAsync()).ReturnsAsync(peopleList);

            // Act
            var result = await _service.GetPeopleAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
            Assert.Equal("Alice", result.First().FirstName);
            Assert.Equal("Smith", result.First().LastName);
            Assert.NotEqual("Magrina", result.First().LastName);
        }

        [Fact]
        public async Task GetPeopleAsync_ShouldThrow_WhenRepositoryReturnsNull()
        {
            // Arrange
            _repoMock.Setup(r => r.GetAllPeopleDataAsync()).ReturnsAsync((List<Person>?)null);

            // Act & Assert
            var ex = await Assert.ThrowsAsync<KeyNotFoundException>(() => _service.GetPeopleAsync());
            Assert.Equal("No people found.", ex.Message);
        }

        [Fact]
        public async Task AddPersonAsync_ShouldThrow_WhenEmailInvalid()
        {
            person.Email = "invalid.gmail.com";
            await Assert.ThrowsAsync<ArgumentException>(() => _service.AddPersonAsync(person));
        }

        [Fact]
        public async Task AddPersonAsync_ShouldCallRepo_WhenValid()
        {
            await _service.AddPersonAsync(person);
            _repoMock.Verify(r => r.AddAsync(It.IsAny<Person>()), Times.Once);
        }

        [Fact]
        public async Task UpdatePersonAsync_ShouldValidateEmail()
        {
            await _service.UpdatePersonAsync(person);
            _repoMock.Verify(r => r.UpdatePersonDataAsync(It.IsAny<Person>()), Times.Once);
        }
    }

}