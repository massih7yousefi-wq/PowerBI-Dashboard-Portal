using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Metric;

public class CreateMetricDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }

    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [StringLength(4000)]
    public string Definition { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string Source { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Unit { get; set; } = string.Empty;

    public decimal? TargetValue { get; set; }
}