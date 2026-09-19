using HRDashboard.DTOs.Dashboard;

namespace HRDashboard.Services.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummaryResponseDto> GetSummaryAsync();
}