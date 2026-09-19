using HRDashboard.DTOs.Task;

namespace HRDashboard.Services.Interfaces;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllAsync();

    Task<TaskResponseDto?> GetByIdAsync(Guid id);

    Task<TaskResponseDto> CreateAsync(
        CreateTaskDto dto,
        string userId);

    Task<TaskResponseDto?> UpdateAsync(
        Guid id,
        UpdateTaskDto dto,
        string userId);

    Task<bool> DeleteAsync(
        Guid id,
        string userId);
}