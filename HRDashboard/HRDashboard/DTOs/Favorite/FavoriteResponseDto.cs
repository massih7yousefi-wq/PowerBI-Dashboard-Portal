namespace HRDashboard.DTOs.Favorite;

public class FavoriteResponseDto
{
    public Guid Id { get; set; }

    public Guid ProjectId { get; set; }

    public string ProjectName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}