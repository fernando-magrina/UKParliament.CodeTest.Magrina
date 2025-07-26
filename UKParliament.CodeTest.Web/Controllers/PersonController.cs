using Microsoft.AspNetCore.Mvc;

using UKParliament.CodeTest.Services.Interfaces;
using UKParliament.CodeTest.Web.Mappers.Interfaces;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonService personService;
    private readonly IPersonMapper mapper;

    public PersonController(IPersonService personService, IPersonMapper mapper)
    {
        this.personService = personService;
        this.mapper = mapper;
    }

    [Route("{id:int}")]
    [HttpGet]
    public async Task<ActionResult<PersonViewModel>> GetPersonByIdAsync(int id)
    {
        try
        {
            var person = await personService.GetByIdAsync(id);
            return Ok(person);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<PersonViewModel>>> GetPeopleAsync()
    {
        try
        {
            var listOfPeople = await personService.GetPeopleAsync();
            return Ok(listOfPeople);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut]
    public async Task<ActionResult<List<PersonViewModel>>> UpdatePersonAsync(PersonViewModel personView)
    {
        try
        {
            var person = mapper.ToEntity(personView);
            var listOfPeople = await personService.UpdatePersonAsync(person);
            return Ok(listOfPeople);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
