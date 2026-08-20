using UrlShortener.Api.Models;

namespace UrlShortener.Api.Interfaces.Repositories;

public interface ILinkRepository
{
    Task<ShortLink> CreateAsync(ShortLink link);

    Task<IEnumerable<ShortLink>> GetAllAsync();

    Task<ShortLink?> GetByCodeAsync(string shortCode);

    Task<bool> ExistsByCodeAsync(string shortCode);

    Task<bool> UpdateAsync(ShortLink link);

    Task DeleteAsync(ShortLink link);
}