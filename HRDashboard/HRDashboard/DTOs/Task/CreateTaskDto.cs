using HRDashboard.Models;
using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Task;

public class CreateTaskDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }

    public BiTaskStatus Status { get; set; } = BiTaskStatus.Todo;

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public DateTime? DueDate { get; set; }
}