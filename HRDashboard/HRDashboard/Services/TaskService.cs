using HRDashboard.Data;
using HRDashboard.DTOs.Task;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;
    private readonly IActivityService _activityService;

    public TaskService(
        AppDbContext context,
        IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    public async Task<List<TaskResponseDto>> GetAllAsync()
    {
        return await _context.BiTasks
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => ToDto(t))
            .ToListAsync();
    }

    public async Task<TaskResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.BiTasks
            .AsNoTracking()
            .Where(t => t.Id == id)
            .Select(t => ToDto(t))
            .FirstOrDefaultAsync();
    }

    public async Task<TaskResponseDto> CreateAsync(
        CreateTaskDto dto,
        string userId)
    {
        var now = DateTime.UtcNow;

        var task = new BiTask
        {
            Id = Guid.NewGuid(),
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate?.ToUniversalTime(),
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.BiTasks.Add(task);
        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "TaskCreated",
            $"Task '{task.Title}' was created.",
            "Task",
            task.Id);

        return ToDto(task);
    }

    public async Task<TaskResponseDto?> UpdateAsync(
        Guid id,
        UpdateTaskDto dto,
        string userId)
    {
        var task = await _context.BiTasks
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task is null)
            return null;

        var previousStatus = task.Status;

        task.Title = dto.Title.Trim();
        task.Description = dto.Description?.Trim();
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.DueDate = dto.DueDate?.ToUniversalTime();
        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "TaskUpdated",
            $"Task '{task.Title}' was updated.",
            "Task",
            task.Id);

        if (previousStatus != BiTaskStatus.Done &&
            task.Status == BiTaskStatus.Done)
        {
            await _activityService.LogAsync(
                userId,
                "TaskCompleted",
                $"Task '{task.Title}' was completed.",
                "Task",
                task.Id);
        }

        return ToDto(task);
    }

    public async Task<bool> DeleteAsync(
        Guid id,
        string userId)
    {
        var task = await _context.BiTasks
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task is null)
            return false;

        _context.BiTasks.Remove(task);

        await _context.SaveChangesAsync();

        return true;
    }

    private static TaskResponseDto ToDto(BiTask task)
    {
        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }
}