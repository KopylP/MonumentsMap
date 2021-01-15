FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY . ./MailService
COPY ../Contracts ./Contracts

RUN dotnet restore "./MailService/MonumentsMap.MailService/MonumentsMap.MailService.csproj"

WORKDIR /app/MailService/MonumentsMap.MailService
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
RUN apt-get clean
RUN apt-get update

ENTRYPOINT ["dotnet", "MonumentsMap.MailService.dll"]