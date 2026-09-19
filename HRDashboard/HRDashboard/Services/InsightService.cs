using HRDashboard.Data;
using HRDashboard.DTOs.Insight;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class InsightService : IInsightService
{
    private readonly AppDbContext _context;
    private readonly IActivityService _activityService;

    public InsightService(
        AppDbContext context,
        IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    public async Task<List<InsightResponseDto>> GetAllAsync()
    {
        return await _context.Insights
            .AsNoTracking()
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => ToDto(i))
            .ToListAsync();
    }

    public async Task<InsightResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Insights
            .AsNoTracking()
            .Where(i => i.Id == id)
            .Select(i => ToDto(i))
            .FirstOrDefaultAsync();
    }

    public async Task<InsightResponseDto> CreateAsync(
        CreateInsightDto dto,
        string userId)
    {
        var now = DateTime.UtcNow;

        var insight = new Insight
        {
            Id = Guid.NewGuid(),
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            Type = dto.Type,
            Severity = dto.Severity,
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.Insights.Add(insight);
        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "InsightCreated",
            $"Insight '{insight.Title}' was created.",
            "Insight",
            insight.Id);

        return ToDto(insight);
    }

    public async Task<InsightResponseDto?> UpdateAsync(
        Guid id,
        UpdateInsightDto dto,
        string userId)
    {
        var insight = await _context.Insights
            .FirstOrDefaultAsync(i => i.Id == id);

        if (insight is null)
            return null;

        insight.Title = dto.Title.Trim();
        insight.Description = dto.Description?.Trim();
        insight.Type = dto.Type;
        insight.Severity = dto.Severity;
        insight.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "InsightUpdated",
            $"Insight '{insight.Title}' was updated.",
            "Insight",
            insight.Id);

        return ToDto(insight);
    }

    public async Task<bool> DeleteAsync(
        Guid id,
        string userId)
    {
        var insight = await _context.Insights
            .FirstOrDefaultAsync(i => i.Id == id);

        if (insight is null)
            return false;

        _context.Insights.Remove(insight);

        await _context.SaveChangesAsync();

        return true;
    }

    private static InsightResponseDto ToDto(Insight insight)
    {
        return new InsightResponseDto
        {
            Id = insight.Id,
            Title = insight.Title,
            Description = insight.Description,
            Type = insight.Type,
            Severity = insight.Severity,
            CreatedAt = insight.CreatedAt,
            UpdatedAt = insight.UpdatedAt
        };
    }
}