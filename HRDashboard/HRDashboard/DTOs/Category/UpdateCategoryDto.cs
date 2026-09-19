using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Category;

public class UpdateCategoryDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }
}