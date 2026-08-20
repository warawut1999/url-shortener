namespace UrlShortener.Api.DTOs.Responses;

public class LinkStatsResponse
{
    public string ShortCode { get; set; } = string.Empty;

    public string OriginalUrl { get; set; } = string.Empty;

    public int ClickCount { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? LastAccessedAt { get; set; }

    public bool IsDisabled { get; set; }

    public bool IsIOS { get; set; }

    public bool IsAndroid { get; set; }
}