using HRDashboard.Models;
using System.ComponentModel.DataAnnotations;

namespace HRDashboard.DTOs.Insight;

public class UpdateInsightDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(4000)]
    public string? Description { get; set; }

    public InsightType Type { get; set; }

    public InsightSeverity Severity { get; set; }
}