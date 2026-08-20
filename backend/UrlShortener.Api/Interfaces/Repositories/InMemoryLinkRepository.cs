using UrlShortener.Api.Interfaces.Repositories;
using UrlShortener.Api.Models;

namespace UrlShortener.Api.Repositories;

public class InMemoryLinkRepository : ILinkRepository
{
    private readonly List<ShortLink> _links = [];

    public Task<ShortLink> CreateAsync(ShortLink link)
    {
        _links.Add(link);

        return Task.FromResult(link);
    }

    public Task<IEnumerable<ShortLink>> GetAllAsync()
    {
        return Task.FromResult(_links.AsEnumerable());
    }

    public Task<ShortLink?> GetByCodeAsync(string shortCode)
    {
        var link = _links.FirstOrDefault(x =>
            x.ShortCode.Equals(
                shortCode,
                StringComparison.OrdinalIgnoreCase
            ));

        return Task.FromResult(link);
    }

    public Task<bool> ExistsByCodeAsync(string shortCode)
    {
        var exists = _links.Any(x =>
            x.ShortCode.Equals(
                shortCode,
                StringComparison.OrdinalIgnoreCase
            ));

        return Task.FromResult(exists);
    }

    public Task<bool> UpdateAsync(ShortLink link)
    {
        var existingLink = _links.FirstOrDefault(x =>
            x.ShortCode.Equals(
                link.ShortCode,
                StringComparison.OrdinalIgnoreCase
            ));

        if (existingLink is null)
        {
            return Task.FromResult(false);
        }

        existingLink.IsDisabled = link.IsDisabled;

        return Task.FromResult(true);
    }

    public Task DeleteAsync(ShortLink link)
    {
        _links.Remove(link);

        return Task.CompletedTask;
    }
}