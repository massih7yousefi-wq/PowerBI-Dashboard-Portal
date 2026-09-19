using HRDashboard.Models;

namespace HRDashboard.Services.Interfaces;

public interface IJwtService
{
    Task<(string Token, DateTime ExpiresAt)> GenerateTokenAsync(AppUser user);
}