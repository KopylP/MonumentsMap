import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import languageEN from "./locate/en/translate.json";
import languageUA from "./locate/ua/translate.json";
import languagePL from "./locate/pl/translate.json";
import languageRU from "./locate/ru/translate.json";
import { defaultCulture } from "./config";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: languageEN,
      uk: languageUA,
      pl: languagePL,
      ru: languageRU,
    },
    /* default language when load the website in browser */
    lng: defaultCulture.split("-")[0],
    /* When react i18next not finding any language to as default in borwser */
    fallbackLng: "en",
    /* debugger For Development environment */
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
    },
  });

export default i18n;
