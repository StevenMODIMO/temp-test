// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18next
i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Fallback language
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to load translations
    },
  });

export default i18n;
