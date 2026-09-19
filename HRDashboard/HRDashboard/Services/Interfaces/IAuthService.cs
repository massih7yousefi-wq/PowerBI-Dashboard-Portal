using HRDashboard.DTOs.Auth;

namespace HRDashboard.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request);
}