namespace HRDashboard.Models;

public class Insight
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public InsightType Type { get; set; }

    public InsightSeverity Severity { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}