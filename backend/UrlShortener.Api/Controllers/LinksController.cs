using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Api.DTOs.Requests;
using UrlShortener.Api.DTOs.Responses;
using UrlShortener.Api.Interfaces.Services;

namespace UrlShortener.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinksController : ControllerBase
{
    private readonly ILinkService _service;
    private readonly IValidator<CreateLinkRequest> _validator;

    public LinksController(
        ILinkService service,
        IValidator<CreateLinkRequest> validator)
    {
        _service = service;
        _validator = validator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateLinkRequest request)
    {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(x => x.PropertyName)
                .ToDictionary(
                    x => x.Key,
                    x => x.Select(e => e.ErrorMessage).ToArray()
                );

            return BadRequest(
                new ApiResponse<object>
                {
                    Success = false,
                    Message = "Validation failed.",
                    Data = errors
                }
            );
        }

        var result = await _service.CreateAsync(request);

        return Ok(
            ApiResponse<CreateLinkResponse>.Ok(
                result
            )
        );
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();

        return Ok(
            ApiResponse<IEnumerable<LinkStatsResponse>>.Ok(
                result
            )
        );
    }

    [HttpGet("{shortCode}/stats")]
    public async Task<IActionResult> GetStats(string shortCode)
    {
        var result = await _service.GetStatsAsync(shortCode);

        if (result is null)
        {
            return NotFound(
                ApiResponse<LinkStatsResponse>.Fail(
                    "Short link not found."
                )
            );
        }

        return Ok(
            ApiResponse<LinkStatsResponse>.Ok(
                result
            )
        );
    }

    [HttpPatch("{shortCode}/disable")]
    public async Task<IActionResult> Disable(string shortCode)
    {
        await _service.UpdateAsync(shortCode, true);

        return Ok(
            ApiResponse<object>.Ok(
                null!
            )
        );
    }

    [HttpPatch("{shortCode}/enable")]
    public async Task<IActionResult> Enable(string shortCode)
    {
        await _service.UpdateAsync(shortCode, false);

        return Ok(
            ApiResponse<object>.Ok(
                null!
            )
        );
    }

    [HttpDelete("{shortCode}")]
    public async Task<IActionResult> Delete(string shortCode)
    {
        await _service.DeleteAsync(shortCode);

        return Ok(
            ApiResponse<object>.Ok(
                null!,
                "Link deleted successfully."
            )
        );
    }
}