// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tg"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
