using HRDashboard.DTOs.Activity;
using HRDashboard.DTOs.Insight;
using HRDashboard.DTOs.Task;

namespace HRDashboard.DTOs.Dashboard;

public class DashboardSummaryResponseDto
{
    public int TotalProjects { get; set; }

    public int TotalMetrics { get; set; }

    public int TotalTasks { get; set; }

    public int CompletedTasks { get; set; }

    public int PendingTasks { get; set; }

    public int TotalInsights { get; set; }

    public List<ActivityResponseDto> RecentActivities { get; set; } = [];

    public List<InsightResponseDto> RecentInsights { get; set; } = [];

    public List<TaskResponseDto> UpcomingTasks { get; set; } = [];
}