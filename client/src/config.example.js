const supportedCultures = [
    {code: "uk-UA", name: "Українська"},
    {code: "en-GB", name: "English"},
    {code: "pl-PL", name: "Polski"},
    {code: "ru-RU", name: "Русский"},
];

const defaultCulture = "uk-UA";
const defaultClientCulture = "en-GB";

const serverHost = "/";

const defaultCity = {
    lat: 49.5897423, //center point of default city
    lng: 34.5507948, //center point of default city
}

const defaultZoom = 18;

const contactMail = "<--Your mail to contact-->";

const accessToken = "<--Access token for https://www.jawg.io map-->";

const mapStyle = "<--Your map style token here https://www.jawg.io -->";

const yearsRange = [1700, new Date().getFullYear()];

// export {
//     supportedCultures,
//     serverHost,
//     defaultCity,
//     defaultZoom,
//     accessToken,
//     defaultCulture,
//     defaultClientCulture,
//     yearsRange,
//     loadMapZoom,
//     contactMail
//     mapStyle,
// }