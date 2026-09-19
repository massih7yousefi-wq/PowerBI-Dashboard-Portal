namespace HRDashboard.DTOs.Project;

public class ProjectResponseDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string EmbedUrl { get; set; } = string.Empty;

    public Guid? CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}