using HRDashboard.Models;
using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Task;

public class UpdateTaskDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }

    public BiTaskStatus Status { get; set; }

    public TaskPriority Priority { get; set; }

    public DateTime? DueDate { get; set; }
}