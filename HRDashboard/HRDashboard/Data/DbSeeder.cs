using HRDashboard.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(
        IServiceProvider services,
        IConfiguration configuration)
    {
        var roleManager =
            services.GetRequiredService<RoleManager<IdentityRole>>();

        var userManager =
            services.GetRequiredService<UserManager<AppUser>>();

        var dbContext =
            services.GetRequiredService<AppDbContext>();

        // ---------------------------------------------------------
        // Database Migration
        // ---------------------------------------------------------

        await dbContext.Database.MigrateAsync();

        // ---------------------------------------------------------
        // Roles
        // ---------------------------------------------------------

        const string adminRole = "Admin";
        const string userRole = "User";

        if (!await roleManager.RoleExistsAsync(adminRole))
        {
            var result = await roleManager.CreateAsync(
                new IdentityRole(adminRole));

            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Could not create {adminRole} role: " +
                    string.Join(
                        ", ",
                        result.Errors.Select(e => e.Description)));
            }
        }

        if (!await roleManager.RoleExistsAsync(userRole))
        {
            var result = await roleManager.CreateAsync(
                new IdentityRole(userRole));

            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Could not create {userRole} role: " +
                    string.Join(
                        ", ",
                        result.Errors.Select(e => e.Description)));
            }
        }

        // ---------------------------------------------------------
        // Admin User
        // ---------------------------------------------------------

        var adminEmail = configuration["ADMIN_EMAIL"];
        var adminPassword = configuration["ADMIN_PASSWORD"];

        if (!string.IsNullOrWhiteSpace(adminEmail) &&
            !string.IsNullOrWhiteSpace(adminPassword))
        {
            var admin =
                await userManager.FindByEmailAsync(adminEmail);

            if (admin is null)
            {
                admin = new AppUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createResult =
                    await userManager.CreateAsync(
                        admin,
                        adminPassword);

                if (!createResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Could not create initial admin user: " +
                        string.Join(
                            ", ",
                            createResult.Errors.Select(
                                e => e.Description)));
                }
            }

            if (!await userManager.IsInRoleAsync(
                    admin,
                    adminRole))
            {
                var roleResult =
                    await userManager.AddToRoleAsync(
                        admin,
                        adminRole);

                if (!roleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Could not assign Admin role: " +
                        string.Join(
                            ", ",
                            roleResult.Errors.Select(
                                e => e.Description)));
                }
            }
        }

        // ---------------------------------------------------------
        // Default Dashboard Categories
        // ---------------------------------------------------------

        var defaultCategories = new[]
        {
            new Category
            {
                Name = "Workforce",
                Description = "Workforce and employee overview."
            },

            new Category
            {
                Name = "Recruitment",
                Description = "Recruitment and hiring analytics."
            },

            new Category
            {
                Name = "Turnover",
                Description = "Employee turnover and retention analytics."
            },

            new Category
            {
                Name = "Compensation",
                Description = "Compensation and salary analytics."
            },

            new Category
            {
                Name = "Absence",
                Description = "Employee absence and attendance analytics."
            },

            new Category
            {
                Name = "Performance",
                Description = "Employee performance and productivity analytics."
            }
        };

        foreach (var defaultCategory in defaultCategories)
        {
            var exists =
                await dbContext.Categories
                    .AnyAsync(c => c.Name == defaultCategory.Name);

            if (!exists)
            {
                dbContext.Categories.Add(defaultCategory);
            }
        }

        await dbContext.SaveChangesAsync();
    }
}