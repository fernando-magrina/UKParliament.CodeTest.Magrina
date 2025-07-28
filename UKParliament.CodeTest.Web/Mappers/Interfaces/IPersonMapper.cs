using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mappers.Interfaces
{
    public interface IPersonMapper
    {
        Person ToEntity(PersonViewModel viewModel);
        PersonViewModel ToViewModel(Person entity);
    }
}
