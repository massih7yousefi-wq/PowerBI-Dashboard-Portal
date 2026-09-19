using System.ComponentModel.DataAnnotations;

namespace HRDashboard.Validation;

public class HttpsUrlAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value,
        ValidationContext validationContext)
    {
        if (value is null)
        {
            return ValidationResult.Success;
        }

        if (value is not string stringValue ||
            string.IsNullOrWhiteSpace(stringValue))
        {
            return new ValidationResult(
                "A valid HTTPS URL is required.");
        }

        if (!Uri.TryCreate(
                stringValue,
                UriKind.Absolute,
                out var uri))
        {
            return new ValidationResult(
                "EmbedUrl must be a valid URL.");
        }

        if (!string.Equals(
                uri.Scheme,
                Uri.UriSchemeHttps,
                StringComparison.OrdinalIgnoreCase))
        {
            return new ValidationResult(
                "EmbedUrl must use HTTPS.");
        }

        return ValidationResult.Success;
    }
}