FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["backend/Portfolio.API/Portfolio.API.csproj", "backend/Portfolio.API/"]
RUN dotnet restore "backend/Portfolio.API/Portfolio.API.csproj"

COPY . .
WORKDIR "/src/backend/Portfolio.API"
RUN dotnet publish "Portfolio.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["/bin/sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet Portfolio.API.dll"]
