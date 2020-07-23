const supportedCultures = [
    {code: "uk-UA", name: "Українська"},
    {code: "en-GB", name: "English"},
    {code: "pl-PL", name: "Polska"},
    {code: "ru-RU", name: "Русский"},
];

const serverHost = "http://localhost:5000/";

const defaultCity = {
    lat: 49.5897423, //center point of default city
    lng: 34.5507948, //center point of default city
}

const defaultZoom = 14;

const accessToken = "6gbhT4C7Kpj0YRx9mqPWxoZA2IhKXCDTk2L0wFHSurl2EtAxvun10VOtpLfS9rTX";

export {
    supportedCultures,
    serverHost,
    defaultCity,
    defaultZoom,
    accessToken
}