using Microsoft.AspNetCore.Mvc;
using UrlShortener.Api.Interfaces.Services;

namespace UrlShortener.Api.Controllers;

public class RedirectController : ControllerBase
{
    private readonly ILinkService _service;

    public RedirectController(ILinkService service)
    {
        _service = service;
    }

    [HttpGet("/{shortCode}")]
    public async Task<IActionResult> Redirect(
        string shortCode,
        [FromQuery] string? platform)
    {
        var url = await _service.ResolveUrlAsync(
            shortCode,
            platform
        );

        if (url is null)
        {
            return NotFound();
        }

        return Redirect(url);
    }
}