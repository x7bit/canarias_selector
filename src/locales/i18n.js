import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import translationsEn from './en/translations.json';
import translationsEs from './es/translations.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    lng: 'es',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translations: translationsEn,
      },
      es: {
        translations: translationsEs,
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
  });

export default i18n;
