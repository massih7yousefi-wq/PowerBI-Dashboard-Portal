using HRDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRDashboard.Controllers;

[ApiController]
[Authorize]
[Route("api/activities")]
public class ActivitiesController : ControllerBase
{
    private readonly IActivityService _service;

    public ActivitiesController(IActivityService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetRecent(
        [FromQuery] int count = 20)
    {
        return Ok(
            await _service.GetRecentAsync(count));
    }
}