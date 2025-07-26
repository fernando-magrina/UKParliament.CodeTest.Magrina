using Microsoft.AspNetCore.Mvc;

using UKParliament.CodeTest.Services.Interfaces;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonService personService;

    public PersonController(IPersonService personService)
    {
        this.personService = personService;
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
}
