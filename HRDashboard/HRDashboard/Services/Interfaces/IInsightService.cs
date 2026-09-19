using HRDashboard.DTOs.Insight;

namespace HRDashboard.Services.Interfaces;

public interface IInsightService
{
    Task<List<InsightResponseDto>> GetAllAsync();

    Task<InsightResponseDto?> GetByIdAsync(Guid id);

    Task<InsightResponseDto> CreateAsync(
        CreateInsightDto dto,
        string userId);

    Task<InsightResponseDto?> UpdateAsync(
        Guid id,
        UpdateInsightDto dto,
        string userId);

    Task<bool> DeleteAsync(
        Guid id,
        string userId);
}