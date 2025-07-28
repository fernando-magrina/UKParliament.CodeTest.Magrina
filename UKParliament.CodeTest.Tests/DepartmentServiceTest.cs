using Moq;

using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Data.Repositories.Interfaces;
using UKParliament.CodeTest.Services;

using Xunit;

namespace UKParliament.CodeTest.Tests
{
    public class DepartmentServiceTest
    {
        [Fact]
        public async Task GetDepartmentsAsync_ShouldReturnDepartments()
        {
            var mockRepo = new Mock<IDepartmentRepository>();
            mockRepo.Setup(r => r.GetDepartmentsAsync()).ReturnsAsync(new List<Department>
            {
                new Department { Id = 1, Name = "HR" },
                new Department { Id = 2, Name = "Finance" }
            });

            var service = new DepartmentService(mockRepo.Object);

            var result = await service.GetDepartmentsAsync();

            Assert.Equal(2, result.Count);
            Assert.Contains(result, d => d.Name == "HR");
            Assert.DoesNotContain(result, d => d.Name == "DOGS");
        }
    }
}