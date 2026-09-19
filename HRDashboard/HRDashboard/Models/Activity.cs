namespace HRDashboard.Models;

public class Activity
{
    public Guid Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string EntityType { get; set; } = string.Empty;

    public Guid EntityId { get; set; }

    public DateTime CreatedAt { get; set; }

    public AppUser User { get; set; } = null!;
}