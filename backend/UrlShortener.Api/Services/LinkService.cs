using UrlShortener.Api.DTOs.Requests;
using UrlShortener.Api.DTOs.Responses;
using UrlShortener.Api.Interfaces.Generators;
using UrlShortener.Api.Interfaces.Repositories;
using UrlShortener.Api.Interfaces.Services;
using UrlShortener.Api.Exceptions;

namespace UrlShortener.Api.Services;

public class LinkService : ILinkService
{
    private readonly ILinkRepository _repository;
    private readonly IShortCodeGenerator _generator;
    private readonly IConfiguration _configuration;

    public LinkService(
        ILinkRepository repository,
        IShortCodeGenerator generator,
        IConfiguration configuration)
    {
        _repository = repository;
        _generator = generator;
        _configuration = configuration;
    }

    public async Task<CreateLinkResponse> CreateAsync(CreateLinkRequest request)
    {
        var shortCode = request.CustomAlias;

        if (string.IsNullOrWhiteSpace(shortCode))
        {
            do
            {
                shortCode = await _generator.GenerateAsync();
            }
            while (await _repository.ExistsByCodeAsync(shortCode));
        }
        else
        {
            if (await _repository.ExistsByCodeAsync(shortCode))
            {
                throw new BadRequestException("Alias already exists.");
            }
        }

        var link = new Models.ShortLink
        {
            Id = Guid.NewGuid(),
            ShortCode = shortCode!,
            OriginalUrl = request.Url,
            AndroidUrl = request.AndroidUrl,
            IosUrl = request.IosUrl,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.CreateAsync(link);

        var baseUrl = _configuration["ShortUrl:BaseUrl"]
                    ?? "http://localhost:5033";

        return new CreateLinkResponse
        {
            ShortUrl = $"{baseUrl}/{shortCode}"
        };
    }

    public async Task<IEnumerable<LinkStatsResponse>> GetAllAsync()
    {
        var links = await _repository.GetAllAsync();

        return links.Select(link => new LinkStatsResponse
        {
            ShortCode = link.ShortCode,
            OriginalUrl = link.OriginalUrl,
            ClickCount = link.ClickCount,
            CreatedAt = link.CreatedAt,
            LastAccessedAt = link.LastAccessedAt,
            IsDisabled = link.IsDisabled,
            IsIOS = !string.IsNullOrWhiteSpace(link.IosUrl),
            IsAndroid = !string.IsNullOrWhiteSpace(link.AndroidUrl)
        });
    }

    public async Task<LinkStatsResponse?> GetStatsAsync(string shortCode)
    {
        var link = await _repository.GetByCodeAsync(shortCode);

        if (link is null)
            return null;

        return new LinkStatsResponse
        {
            ShortCode = link.ShortCode,
            OriginalUrl = link.OriginalUrl,
            ClickCount = link.ClickCount,
            CreatedAt = link.CreatedAt,
            LastAccessedAt = link.LastAccessedAt,
            IsDisabled = link.IsDisabled,
            IsIOS = !string.IsNullOrWhiteSpace(link.IosUrl),
            IsAndroid = !string.IsNullOrWhiteSpace(link.AndroidUrl)     
        };
    }

    public async Task<bool> UpdateAsync(string shortCode, bool isDisabled = true)
    {
        var link = await _repository.GetByCodeAsync(shortCode);

        if (link is null)
            throw new NotFoundException("Short link not found.");

        link.IsDisabled = isDisabled;
        await _repository.UpdateAsync(link);

        return true;
    }

    public async Task DeleteAsync(string shortCode)
    {
        var link = await _repository.GetByCodeAsync(shortCode);

        if (link is null)
            throw new NotFoundException("Short link not found.");

        await _repository.DeleteAsync(link);
    }

    public async Task<string?> ResolveUrlAsync(string shortCode, string? platform)
    {
        var link = await _repository.GetByCodeAsync(shortCode);

        if (link is null || link.IsDisabled)
            return null;

        link.ClickCount++;
        link.LastAccessedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(link);

        if (platform == "android" && !string.IsNullOrWhiteSpace(link.AndroidUrl))
            return link.AndroidUrl;

        if (platform == "ios" && !string.IsNullOrWhiteSpace(link.IosUrl))
            return link.IosUrl;

        return link.OriginalUrl;
    }
}