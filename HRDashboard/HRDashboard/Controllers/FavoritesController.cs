using HRDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRDashboard.Controllers;

[ApiController]
[Authorize]
[Route("api/favorites")]
public class FavoritesController : ControllerBase
{
    private readonly IFavoriteService _service;

    public FavoritesController(IFavoriteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        return Ok(
            await _service.GetUserFavoritesAsync(userId));
    }

    [HttpPost("{projectId:guid}")]
    public async Task<IActionResult> Add(Guid projectId)
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var result = await _service.AddAsync(
            projectId,
            userId);

        return result is null
            ? NotFound()
            : Ok(result);
    }

    [HttpDelete("{projectId:guid}")]
    public async Task<IActionResult> Remove(Guid projectId)
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var removed = await _service.RemoveAsync(
            projectId,
            userId);

        return removed
            ? NoContent()
            : NotFound();
    }
}