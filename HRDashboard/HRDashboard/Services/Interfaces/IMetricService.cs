using HRDashboard.DTOs.Metric;

namespace HRDashboard.Services.Interfaces;

public interface IMetricService
{
    Task<List<MetricResponseDto>> GetAllAsync();

    Task<MetricResponseDto?> GetByIdAsync(Guid id);

    Task<MetricResponseDto> CreateAsync(
        CreateMetricDto dto,
        string userId);

    Task<MetricResponseDto?> UpdateAsync(
        Guid id,
        UpdateMetricDto dto,
        string userId);

    Task<bool> DeleteAsync(
        Guid id,
        string userId);
}