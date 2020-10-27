import UserRole from "./models/user-role";

const supportedCultures = [
    {code: "uk-UA", name: "Українська"},
    {code: "en-GB", name: "English"},
    {code: "pl-PL", name: "Polski"},
    {code: "ru-RU", name: "Русский"},
];

const defaultCulture = "uk-UA";
const defaultClientCulture = "en-GB";

const serverHost = "/";

const clientId = "monumentsmap";

const supportedRoles = [UserRole.Admin, UserRole.Editor];

// export {
//     supportedCultures,
//     serverHost,
//     clientId,
//     defaultCulture,
//     defaultClientCulture,
//     supportedRoles,
// }