namespace HRDashboard.Models;

public class Favorite
{
    public Guid Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public Guid ProjectId { get; set; }

    public DateTime CreatedAt { get; set; }

    public AppUser User { get; set; } = null!;

    public Project Project { get; set; } = null!;
}