import UserRole from "./models/user-role";

const supportedCultures = [
    {code: "uk-UA", name: "Українська"},
    {code: "en-GB", name: "English"},
    {code: "pl-PL", name: "Polski"},
    {code: "ru-RU", name: "Русский"},
];

const defaultCulture = "uk-UA";
const defaultClientCulture = "en-GB";

// const serverHost = "https://monumentsmap.herokuapp.com/";
const serverHost = "/";

const defaultCity = {
    lat: 49.5897423, //center point of default city
    lng: 34.5507948, //center point of default city
}

const defaultZoom = 18;
const loadMapZoom = 17;

const clientId = "monumentsmap";

const accessToken = "6gbhT4C7Kpj0YRx9mqPWxoZA2IhKXCDTk2L0wFHSurl2EtAxvun10VOtpLfS9rTX";

const yearsRange = [1700, new Date().getFullYear()];

const supportedRoles = [UserRole.Admin, UserRole.Editor];

export {
    supportedCultures,
    serverHost,
    defaultCity,
    defaultZoom,
    accessToken,
    clientId,
    defaultCulture,
    defaultClientCulture,
    yearsRange,
    supportedRoles,
    loadMapZoom
}