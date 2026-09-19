using System.Text;
using System.Text.Json.Serialization;
using HRDashboard.Data;
using HRDashboard.Models;
using HRDashboard.Services;
using HRDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// ---------------------------------------------------------
// Database
// ---------------------------------------------------------

var connectionString =
    configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "ConnectionStrings:DefaultConnection is not configured.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// ---------------------------------------------------------
// Identity
// ---------------------------------------------------------

builder.Services
    .AddIdentityCore<AppUser>(options =>
    {
        options.User.RequireUniqueEmail = true;

        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// ---------------------------------------------------------
// JWT
// ---------------------------------------------------------

var jwtKey = configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "Jwt:Key is not configured.");
}

if (Encoding.UTF8.GetByteCount(jwtKey) < 32)
{
    throw new InvalidOperationException(
        "Jwt:Key must contain at least 32 bytes.");
}

var jwtIssuer = configuration["Jwt:Issuer"]
    ?? throw new InvalidOperationException(
        "Jwt:Issuer is not configured.");

var jwtAudience = configuration["Jwt:Audience"]
    ?? throw new InvalidOperationException(
        "Jwt:Audience is not configured.");

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtKey)),

                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,

                ValidateAudience = true,
                ValidAudience = jwtAudience,

                ValidateLifetime = true,

                ClockSkew = TimeSpan.FromSeconds(30)
            };
    });

builder.Services.AddAuthorization();

// ---------------------------------------------------------
// HTTP Context
// ---------------------------------------------------------

builder.Services.AddHttpContextAccessor();

// ---------------------------------------------------------
// Services
// ---------------------------------------------------------

// Authentication
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();

// Current User
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

// Projects
builder.Services.AddScoped<IProjectService, ProjectService>();

// Tasks
builder.Services.AddScoped<ITaskService, TaskService>();

// Metrics
builder.Services.AddScoped<IMetricService, MetricService>();

// Insights
builder.Services.AddScoped<IInsightService, InsightService>();

// Categories
builder.Services.AddScoped<ICategoryService, CategoryService>();

// Favorites
builder.Services.AddScoped<IFavoriteService, FavoriteService>();

// Activities
builder.Services.AddScoped<IActivityService, ActivityService>();

// Dashboard
builder.Services.AddScoped<IDashboardService, DashboardService>();

// ---------------------------------------------------------
// Controllers
// ---------------------------------------------------------

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    });

// ---------------------------------------------------------
// ProblemDetails
// ---------------------------------------------------------

builder.Services.AddProblemDetails();

// ---------------------------------------------------------
// CORS
// ---------------------------------------------------------

var frontendUrl = configuration["Frontend:Url"];

var allowedOrigins = new List<string>();

if (!string.IsNullOrWhiteSpace(frontendUrl))
{
    allowedOrigins.Add(frontendUrl);
}

if (builder.Environment.IsDevelopment())
{
    allowedOrigins.Add("http://localhost:5173");
}

allowedOrigins = allowedOrigins
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToList();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        if (allowedOrigins.Count == 0)
        {
            if (builder.Environment.IsProduction())
            {
                throw new InvalidOperationException(
                    "Frontend:Url must be configured in production.");
            }

            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();

            return;
        }

        policy
            .WithOrigins(allowedOrigins.ToArray())
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ---------------------------------------------------------
// Swagger
// ---------------------------------------------------------

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "HRDashboard API",
            Version = "v1",
            Description =
                "REST API for the HRDashboard / Power BI Dashboard Portal."
        });

    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description =
                "JWT Authorization header using the Bearer scheme."
        });

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference(
                "Bearer",
                document)] = []
        });
});

// ---------------------------------------------------------
// Build
// ---------------------------------------------------------

var app = builder.Build();

// ---------------------------------------------------------
// Database / Seeder
// ---------------------------------------------------------

using (var scope = app.Services.CreateScope())
{
    await DbSeeder.SeedAsync(
        scope.ServiceProvider,
        app.Configuration);
}

// ---------------------------------------------------------
// Render PORT
// ---------------------------------------------------------

var port = Environment.GetEnvironmentVariable("PORT");

if (!string.IsNullOrWhiteSpace(port) &&
    int.TryParse(port, out var renderPort))
{
    app.Urls.Add($"http://0.0.0.0:{renderPort}");
}
else if (app.Environment.IsProduction())
{
    app.Urls.Add("http://0.0.0.0:10000");
}

// ---------------------------------------------------------
// Error handling
// ---------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler();
    app.UseHsts();
}

// ---------------------------------------------------------
// Middleware
// ---------------------------------------------------------

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();