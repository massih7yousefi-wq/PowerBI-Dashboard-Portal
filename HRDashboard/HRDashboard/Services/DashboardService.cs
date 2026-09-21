using HRDashboard.Data;
using HRDashboard.DTOs.Activity;
using HRDashboard.DTOs.Dashboard;
using HRDashboard.DTOs.Insight;
using HRDashboard.DTOs.Task;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryResponseDto> GetSummaryAsync()
    {
        var now = DateTime.UtcNow;

        // -------------------------------------------------
        // Counts
        // -------------------------------------------------

        var totalProjects =
            await _context.Projects.CountAsync();

        var totalMetrics =
            await _context.Metrics.CountAsync();

        var totalTasks =
            await _context.BiTasks.CountAsync();

        var completedTasks =
            await _context.BiTasks.CountAsync(
                t => t.Status == BiTaskStatus.Done);

        var totalInsights =
            await _context.Insights.CountAsync();

        // -------------------------------------------------
        // Recent Activities
        // -------------------------------------------------

        var recentActivities =
            await _context.Activities
                .AsNoTracking()
                .OrderByDescending(a => a.CreatedAt)
                .Take(10)
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

        // -------------------------------------------------
        // Recent Insights
        // -------------------------------------------------

        var recentInsights =
            await _context.Insights
                .AsNoTracking()
                .OrderByDescending(i => i.CreatedAt)
                .Take(5)
                .Select(i => new InsightResponseDto
                {
                    Id = i.Id,
                    Title = i.Title,
                    Description = i.Description,
                    Type = i.Type,
                    Severity = i.Severity,
                    CreatedAt = i.CreatedAt,
                    UpdatedAt = i.UpdatedAt
                })
                .ToListAsync();

        // -------------------------------------------------
        // Upcoming Tasks
        // -------------------------------------------------

        var upcomingTasks =
            await _context.BiTasks
                .AsNoTracking()
                .Where(t =>
                    t.Status != BiTaskStatus.Done &&
                    t.DueDate != null &&
                    t.DueDate >= now)
                .OrderBy(t => t.DueDate)
                .Take(10)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .ToListAsync();

        // -------------------------------------------------
        // Response
        // -------------------------------------------------

        return new DashboardSummaryResponseDto
        {
            TotalProjects = totalProjects,
            TotalMetrics = totalMetrics,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            PendingTasks = totalTasks - completedTasks,
            TotalInsights = totalInsights,
            RecentActivities = recentActivities,
            RecentInsights = recentInsights,
            UpcomingTasks = upcomingTasks
        };
    }
}