import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import pt from './locales/pt/translation.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en
  },
  pt: {
    translation: pt
  }
};

const language = window.navigator ? window.navigator.language.split(/[-_]/)[0] : 'en';

void i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: 'en'
});

export default i18n;
