const supportedCultures = [
    {code: "uk-UA", name: "Українська"},
    {code: "en-GB", name: "English"},
    {code: "pl-PL", name: "Polska"},
    {code: "ru-RU", name: "Русский"},
];

const defaultCulture = "uk-UA";
const defaultClientCulture = "en-GB";

const serverHost = "http://localhost:5000/";

const defaultCity = {
    lat: 49.5897423, //center point of default city
    lng: 34.5507948, //center point of default city
}

const defaultZoom = 17;

const clientId = "monumentsmap";

const accessToken = "<Your access Jawg map token here>";

// export {
//     supportedCultures,
//     serverHost,
//     defaultCity,
//     defaultZoom,
//     accessToken,
//     clientId,
//     defaultCulture,
//     defaultClientCulture
// }