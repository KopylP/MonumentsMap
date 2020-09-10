import detectBrowserLanguage from "detect-browser-language";

export function defineClientCulture(supportedCultures, defaultCulture) {
  const userCultureIndex = supportedCultures.findIndex(
    (p) => p.code.split("-")[0] === detectBrowserLanguage().split("-")[0]
  );
  return userCultureIndex > -1
    ? supportedCultures[userCultureIndex]
    : defaultCulture;
}
