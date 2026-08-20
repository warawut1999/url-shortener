using UrlShortener.Api.DTOs.Requests;
using UrlShortener.Api.DTOs.Responses;

namespace UrlShortener.Api.Interfaces.Services;

public interface ILinkService
{
    Task<CreateLinkResponse> CreateAsync(CreateLinkRequest request);

    Task<IEnumerable<LinkStatsResponse>> GetAllAsync();

    Task<LinkStatsResponse?> GetStatsAsync(string shortCode);

    Task<bool> UpdateAsync(string shortCode, bool isDisabled = true);

    Task DeleteAsync(string shortCode);

    Task<string?> ResolveUrlAsync(string shortCode, string? platform);
}