using HRDashboard.Data;
using HRDashboard.DTOs.Metric;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class MetricService : IMetricService
{
    private readonly AppDbContext _context;
    private readonly IActivityService _activityService;

    public MetricService(
        AppDbContext context,
        IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    public async Task<List<MetricResponseDto>> GetAllAsync()
    {
        return await _context.Metrics
            .AsNoTracking()
            .OrderBy(m => m.Name)
            .Select(m => ToDto(m))
            .ToListAsync();
    }

    public async Task<MetricResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Metrics
            .AsNoTracking()
            .Where(m => m.Id == id)
            .Select(m => ToDto(m))
            .FirstOrDefaultAsync();
    }

    public async Task<MetricResponseDto> CreateAsync(
        CreateMetricDto dto,
        string userId)
    {
        var now = DateTime.UtcNow;

        var metric = new Metric
        {
            Id = Guid.NewGuid(),
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            Category = dto.Category.Trim(),
            Definition = dto.Definition.Trim(),
            Source = dto.Source.Trim(),
            Unit = dto.Unit.Trim(),
            TargetValue = dto.TargetValue,
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.Metrics.Add(metric);
        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "MetricCreated",
            $"Metric '{metric.Name}' was created.",
            "Metric",
            metric.Id);

        return ToDto(metric);
    }

    public async Task<MetricResponseDto?> UpdateAsync(
        Guid id,
        UpdateMetricDto dto,
        string userId)
    {
        var metric = await _context.Metrics
            .FirstOrDefaultAsync(m => m.Id == id);

        if (metric is null)
            return null;

        metric.Name = dto.Name.Trim();
        metric.Description = dto.Description?.Trim();
        metric.Category = dto.Category.Trim();
        metric.Definition = dto.Definition.Trim();
        metric.Source = dto.Source.Trim();
        metric.Unit = dto.Unit.Trim();
        metric.TargetValue = dto.TargetValue;
        metric.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "MetricUpdated",
            $"Metric '{metric.Name}' was updated.",
            "Metric",
            metric.Id);

        return ToDto(metric);
    }

    public async Task<bool> DeleteAsync(
        Guid id,
        string userId)
    {
        var metric = await _context.Metrics
            .FirstOrDefaultAsync(m => m.Id == id);

        if (metric is null)
            return false;

        _context.Metrics.Remove(metric);

        await _context.SaveChangesAsync();

        return true;
    }

    private static MetricResponseDto ToDto(Metric metric)
    {
        return new MetricResponseDto
        {
            Id = metric.Id,
            Name = metric.Name,
            Description = metric.Description,
            Category = metric.Category,
            Definition = metric.Definition,
            Source = metric.Source,
            Unit = metric.Unit,
            TargetValue = metric.TargetValue,
            CreatedAt = metric.CreatedAt,
            UpdatedAt = metric.UpdatedAt
        };
    }
}