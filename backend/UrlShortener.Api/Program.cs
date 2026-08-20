using FluentValidation;
using Microsoft.EntityFrameworkCore;
using UrlShortener.Api.Data;
using UrlShortener.Api.Interfaces.Generators;
using UrlShortener.Api.Interfaces.Repositories;
using UrlShortener.Api.Interfaces.Services;
using UrlShortener.Api.Middleware;
using UrlShortener.Api.Repositories;
using UrlShortener.Api.Services;
using UrlShortener.Api.Services.ShortCodeGenerators;
using UrlShortener.Api.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddValidatorsFromAssemblyContaining<CreateLinkRequestValidator>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ILinkRepository, EfCoreLinkRepository>();

builder.Services.AddScoped<IShortCodeGenerator, RandomShortCodeGenerator>();

builder.Services.AddScoped<ILinkService, LinkService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");

app.UseMiddleware<ExceptionMiddleware>();

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();