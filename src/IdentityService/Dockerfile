FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./IdentityService ./IdentityService
COPY ./Contracts ./Contracts

RUN dotnet restore "./IdentityService/MonumentsMap.IdentityService/MonumentsMap.IdentityService.csproj"

WORKDIR /app/IdentityService/MonumentsMap.IdentityService
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
RUN apt-get clean
RUN apt-get update

ENTRYPOINT ["dotnet", "MonumentsMap.IdentityService.dll"]