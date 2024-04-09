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
    fallbackLng: 'es', // Idioma por defecto
    detection: {
      order: ['localStorage', 'navigator'], // Intenta detectar el idioma primero en el almacenamiento local y luego en el navegador
      lookupLocalStorage: 'i18nextLng', // Clave para buscar el idioma en localStorage
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
