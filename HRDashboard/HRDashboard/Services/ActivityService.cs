using HRDashboard.Data;
using HRDashboard.DTOs.Activity;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class ActivityService : IActivityService
{
    private readonly AppDbContext _context;

    public ActivityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(
        string userId,
        string type,
        string description,
        string entityType,
        Guid entityId)
    {
        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Type = type,
            Description = description,
            EntityType = entityType,
            EntityId = entityId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Activities.Add(activity);

        await _context.SaveChangesAsync();
    }

    public async Task<List<ActivityResponseDto>> GetRecentAsync(
        int count = 20)
    {
        count = Math.Clamp(count, 1, 100);

        return await _context.Activities
            .AsNoTracking()
            .OrderByDescending(a => a.CreatedAt)
            .Take(count)
            .Select(a => new ActivityResponseDto
            {
                Id = a.Id,
                Type = a.Type,
                Description = a.Description,
                EntityType = a.EntityType,
                EntityId = a.EntityId,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }
}