using HRDashboard.DTOs.Activity;

namespace HRDashboard.Services.Interfaces;

public interface IActivityService
{
    Task LogAsync(
        string userId,
        string type,
        string description,
        string entityType,
        Guid entityId);

    Task<List<ActivityResponseDto>> GetRecentAsync(
        int count = 20);
}