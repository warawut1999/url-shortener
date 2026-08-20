using UrlShortener.Api.Interfaces.Generators;

namespace UrlShortener.Api.Services.ShortCodeGenerators;

public class RandomShortCodeGenerator : IShortCodeGenerator
{
    private const string Characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private readonly Random _random = new();

    public Task<string> GenerateAsync()
    {
        var code = new string(
            Enumerable.Range(0, 6)
                .Select(_ => Characters[_random.Next(Characters.Length)])
                .ToArray());

        return Task.FromResult(code);
    }
}