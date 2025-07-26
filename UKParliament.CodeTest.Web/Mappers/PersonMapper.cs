using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Web.Mappers.Interfaces;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mappers
{
    public class PersonMapper : IPersonMapper
    {
        public Person ToEntity(PersonViewModel vm) =>
            new Person
            {
                Id = vm.Id,
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                DOB = vm.DOB,
                Department = vm.Department
            };

        public PersonViewModel ToViewModel(Person p) =>
            new PersonViewModel
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DOB = p.DOB,
                Department = p.Department
            };
    }
}
