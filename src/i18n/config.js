import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./locales/en/translation.json";
import ptTranslations from "./locales/pt/translation.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "pt",
    lng: localStorage.getItem("language") || "en",
    debug: true,
    resources: {
      pt: { translations: ptTranslations },
      en: { translations: enTranslations },
    },
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: { escapeValue: false },
  });

i18n.languages = ["pt", "en"];
export default i18n;
