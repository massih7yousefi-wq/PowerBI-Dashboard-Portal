namespace HRDashboard.DTOs.Activity;

public class ActivityResponseDto
{
    public Guid Id { get; set; }

    public string Type { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string EntityType { get; set; } = string.Empty;

    public Guid EntityId { get; set; }

    public DateTime CreatedAt { get; set; }
}