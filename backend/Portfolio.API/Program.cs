using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => origin.StartsWith("http://localhost") || origin.StartsWith("http://127.0.0.1"))
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure SQLite Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"]
    ?? throw new InvalidOperationException("Jwt:Secret is not configured. Set it via user-secrets or the Jwt__Secret environment variable.");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "PortfolioAPI",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "PortfolioAdmin",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });
builder.Services.AddAuthorization();

// Rate limiting for login (anti brute-force)
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("loginLimit", opt =>
    {
        opt.PermitLimit = 5;
        opt.Window = TimeSpan.FromMinutes(1);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

// Serve static files for uploads
app.UseStaticFiles();

// Base API Group
var apiGroup = app.MapGroup("/api");

// Placeholder endpoint
apiGroup.MapGet("/health", () => Results.Ok(new { Status = "Healthy" }));

// Map Endpoints
apiGroup.MapProfileEndpoints();
apiGroup.MapSocialEndpoints();
apiGroup.MapExperienceEndpoints();
apiGroup.MapProjectEndpoints();
apiGroup.MapSkillEndpoints();
apiGroup.MapAchievementEndpoints();
apiGroup.MapAuthEndpoints(builder.Configuration);
apiGroup.MapUploadEndpoints();

// Seed Data
SeedData.Seed(app);

app.Run();
