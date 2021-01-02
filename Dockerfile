FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY . ./

RUN dotnet restore "./MonumentsMap.WebApi/MonumentsMap.WebApi.csproj"

WORKDIR /app/MonumentsMap.WebApi
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
RUN apt-get update
RUN apt-get install -y libfreetype6
RUN apt-get install -y libfontconfig1
ENTRYPOINT ["dotnet", "MonumentsMap.WebApi.dll"]