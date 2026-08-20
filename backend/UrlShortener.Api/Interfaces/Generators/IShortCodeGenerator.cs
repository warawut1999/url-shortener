namespace UrlShortener.Api.Interfaces.Generators;

public interface IShortCodeGenerator
{
    Task<string> GenerateAsync();
}