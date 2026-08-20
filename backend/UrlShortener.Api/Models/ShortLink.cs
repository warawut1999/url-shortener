namespace UrlShortener.Api.Models;

public class ShortLink
{
    public Guid Id { get; set; }

    public string ShortCode { get; set; } = string.Empty;

    public string OriginalUrl { get; set; } = string.Empty;

    // Platform-specific URLs (Optional)
    public string? AndroidUrl { get; set; }

    public string? IosUrl { get; set; }

    public int ClickCount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? LastAccessedAt { get; set; }

    public bool IsDisabled { get; set; }

    public bool IsDeleted { get; set; }
}