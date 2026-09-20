# ================================
# Build Stage
# ================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Copy project file
COPY HRDashboard/HRDashboard/HRDashboard.csproj HRDashboard/HRDashboard/

# Restore dependencies
RUN dotnet restore HRDashboard/HRDashboard/HRDashboard.csproj

# Copy source code
COPY . .

# Publish application
RUN dotnet publish HRDashboard/HRDashboard/HRDashboard.csproj \
    -c Release \
    -o /app/publish \
    --no-restore


# ================================
# Runtime Stage
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

# Copy published application
COPY --from=build /app/publish .

# Render provides PORT at runtime.
# ASP.NET Core listens on all network interfaces.
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000}

# Start application
ENTRYPOINT ["dotnet", "HRDashboard.dll"]