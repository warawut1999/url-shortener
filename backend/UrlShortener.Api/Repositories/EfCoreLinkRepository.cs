using Microsoft.EntityFrameworkCore;
using UrlShortener.Api.Data;
using UrlShortener.Api.Interfaces.Repositories;
using UrlShortener.Api.Models;

namespace UrlShortener.Api.Repositories;

public class EfCoreLinkRepository : ILinkRepository
{
    private readonly AppDbContext _db;

    public EfCoreLinkRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ShortLink> CreateAsync(ShortLink link)
    {
        _db.ShortLinks.Add(link);

        await _db.SaveChangesAsync();

        return link;
    }

    public async Task<IEnumerable<ShortLink>> GetAllAsync()
    {
        return await _db.ShortLinks
            .AsNoTracking()
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<ShortLink?> GetByCodeAsync(string shortCode)
    {
        return await _db.ShortLinks
            .FirstOrDefaultAsync(x =>
                x.ShortCode == shortCode &&
                !x.IsDeleted);
    }

    public async Task<bool> ExistsByCodeAsync(string shortCode)
    {
        return await _db.ShortLinks
            .AnyAsync(x =>
                x.ShortCode == shortCode &&
                !x.IsDeleted);
    }

    public async Task<bool> UpdateAsync(ShortLink link)
    {
        var existingLink = await _db.ShortLinks
            .FirstOrDefaultAsync(x =>
                x.ShortCode == link.ShortCode &&
                !x.IsDeleted);

        if (existingLink is null)
        {
            return false;
        }

        // ตอนนี้ Update ใช้สำหรับ Enable / Disable
        existingLink.IsDisabled = link.IsDisabled;

        await _db.SaveChangesAsync();

        return true;
    }

    public async Task DeleteAsync(ShortLink link)
    {
        link.IsDeleted = true;

        await _db.SaveChangesAsync();
    }
}