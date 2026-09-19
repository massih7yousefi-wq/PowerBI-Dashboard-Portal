using HRDashboard.DTOs.Auth;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace HRDashboard.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IJwtService _jwtService;

    public AuthService(
        UserManager<AppUser> userManager,
        IJwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService;
    }

    public async Task<LoginResponseDto?> LoginAsync(
        LoginRequestDto request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
        {
            return null;
        }

        var passwordValid = await _userManager.CheckPasswordAsync(
            user,
            request.Password);

        if (!passwordValid)
        {
            return null;
        }

        var roles = await _userManager.GetRolesAsync(user);

        var (token, expiresAt) =
            await _jwtService.GenerateTokenAsync(user);

        return new LoginResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt,
            User = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                Role = roles.FirstOrDefault() ?? string.Empty
            }
        };
    }
}