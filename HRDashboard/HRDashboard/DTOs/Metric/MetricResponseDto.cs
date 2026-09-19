namespace HRDashboard.DTOs.Metric;

public class MetricResponseDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Category { get; set; } = string.Empty;

    public string Definition { get; set; } = string.Empty;

    public string Source { get; set; } = string.Empty;

    public string Unit { get; set; } = string.Empty;

    public decimal? TargetValue { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}