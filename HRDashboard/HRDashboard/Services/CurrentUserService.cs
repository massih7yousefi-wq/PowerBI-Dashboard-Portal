using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HRDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace HRDashboard.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string UserId
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (user is null ||
                user.Identity?.IsAuthenticated != true)
            {
                throw new UnauthorizedAccessException(
                    "User is not authenticated.");
            }

            var userId =
                user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? user.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new UnauthorizedAccessException(
                    "User ID was not found in the authentication token.");
            }

            return userId;
        }
    }
}