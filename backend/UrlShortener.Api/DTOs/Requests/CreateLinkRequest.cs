namespace UrlShortener.Api.DTOs.Requests;

public class CreateLinkRequest
{
    public string Url { get; set; } = string.Empty;

    public string? CustomAlias { get; set; }

    public string? AndroidUrl { get; set; }

    public string? IosUrl { get; set; }
}