using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Project;

public class CreateProjectDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }

    [Required]
    [StringLength(2000)]
    [Url]
    public string EmbedUrl { get; set; } = string.Empty;

    public Guid? CategoryId { get; set; }
}