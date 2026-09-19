using HRDashboard.DTOs.Project;

namespace HRDashboard.Services.Interfaces;

public interface IProjectService
{
    Task<List<ProjectResponseDto>> GetAllAsync();

    Task<ProjectResponseDto?> GetByIdAsync(Guid id);

    Task<ProjectResponseDto> CreateAsync(
        CreateProjectDto dto,
        string userId);

    Task<ProjectResponseDto?> UpdateAsync(
        Guid id,
        UpdateProjectDto dto,
        string userId);

    Task<bool> DeleteAsync(
        Guid id,
        string userId);
}