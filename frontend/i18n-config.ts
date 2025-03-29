export const i18n = {
  defaultLocale: "en",
  locales: ["en", "es", "pl"],
  localeNames: {
    en: "English",
    es: "Español",
    pl: "Polski",
  },
} as const;

export type Locale = (typeof i18n)["locales"][number];
