using FluentValidation;
using UrlShortener.Api.DTOs.Requests;

namespace UrlShortener.Api.Validators;

public class CreateLinkRequestValidator
    : AbstractValidator<CreateLinkRequest>
{
    public CreateLinkRequestValidator()
    {
        // URL is required
        RuleFor(x => x.Url)
            .NotEmpty()
            .WithMessage("URL is required.");

        // URL format
        RuleFor(x => x.Url)
            .Must(BeValidUrl)
            .When(x => !string.IsNullOrWhiteSpace(x.Url))
            .WithMessage("URL must be a valid HTTP or HTTPS URL.");

        // Custom Alias
        RuleFor(x => x.CustomAlias)
            .MaximumLength(20)
            .When(x => !string.IsNullOrWhiteSpace(x.CustomAlias))
            .WithMessage("Custom alias must not exceed 20 characters.");

        RuleFor(x => x.CustomAlias)
            .Matches("^[a-zA-Z0-9-_]+$")
            .When(x => !string.IsNullOrWhiteSpace(x.CustomAlias))
            .WithMessage(
                "Custom alias can contain only letters, numbers, hyphens, and underscores."
            );

        // Android URL
        RuleFor(x => x.AndroidUrl)
            .Must(BeValidUrl)
            .When(x => !string.IsNullOrWhiteSpace(x.AndroidUrl))
            .WithMessage(
                "Android URL must be a valid HTTP or HTTPS URL."
            );

        // iOS URL
        RuleFor(x => x.IosUrl)
            .Must(BeValidUrl)
            .When(x => !string.IsNullOrWhiteSpace(x.IosUrl))
            .WithMessage(
                "iOS URL must be a valid HTTP or HTTPS URL."
            );
    }

    private static bool BeValidUrl(string? url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return false;

        return Uri.TryCreate(
            url,
            UriKind.Absolute,
            out var uri
        )
        && (
            uri.Scheme == Uri.UriSchemeHttp ||
            uri.Scheme == Uri.UriSchemeHttps
        );
    }
}