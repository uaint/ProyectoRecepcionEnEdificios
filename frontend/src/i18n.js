import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


// Importa las traducciones
import enTranslation from './translations/en.json';
import esTranslation from './translations/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'], 
      lookupLocalStorage: 'i18nextLng', 
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
