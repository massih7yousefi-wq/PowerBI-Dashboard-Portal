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

        var totalProjectsTask =
            _context.Projects.CountAsync();

        var totalMetricsTask =
            _context.Metrics.CountAsync();

        var totalTasksTask =
            _context.BiTasks.CountAsync();

        var completedTasksTask =
            _context.BiTasks.CountAsync(
                t => t.Status == BiTaskStatus.Done);

        var totalInsightsTask =
            _context.Insights.CountAsync();

        var recentActivitiesTask =
            _context.Activities
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

        var recentInsightsTask =
            _context.Insights
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

        var upcomingTasksTask =
            _context.BiTasks
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

        await Task.WhenAll(
            totalProjectsTask,
            totalMetricsTask,
            totalTasksTask,
            completedTasksTask,
            totalInsightsTask,
            recentActivitiesTask,
            recentInsightsTask,
            upcomingTasksTask);

        var totalTasks = totalTasksTask.Result;
        var completedTasks = completedTasksTask.Result;

        return new DashboardSummaryResponseDto
        {
            TotalProjects = totalProjectsTask.Result,
            TotalMetrics = totalMetricsTask.Result,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            PendingTasks = totalTasks - completedTasks,
            TotalInsights = totalInsightsTask.Result,
            RecentActivities = recentActivitiesTask.Result,
            RecentInsights = recentInsightsTask.Result,
            UpcomingTasks = upcomingTasksTask.Result
        };
    }
}