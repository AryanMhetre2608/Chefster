import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './english.json';
import hi from './hindi.json';
import mr from './marathi.json';
import ta from './tamil.json';
import te from './telugu.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  ta: { translation: ta },
  te: { translation: te },
};

const LANGUAGE_KEY = 'appLanguage';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    callback(savedLanguage || 'en'); // default English
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
