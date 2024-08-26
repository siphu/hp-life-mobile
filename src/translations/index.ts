import _ from 'lodash';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import es from './locales/es.json';
import zhHans from './locales/zh-Hans.json';
import id from './locales/id.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import {I18nManager} from 'react-native';

type Translations = typeof en;

type TranslationPaths<T> = {
  [K in keyof T]: T[K] extends object
    ? `${Extract<K, string>}.${TranslationPaths<T[K]>}`
    : Extract<K, string>;
}[keyof T];

export type TranslationsPaths = TranslationPaths<Translations>;

const resources = {
  en: {translation: en},
  fr: {translation: fr},
  ar: {translation: ar},
  hi: {translation: hi},
  pt: {translation: pt},
  es: {translation: es},
  'zh-Hans': {translation: zhHans},
  id: {translation: id},
};

export const getAvailableLanguages = () => {
  return Object.keys(resources);
};

export const rtlLanguages = [
  'ar',
  'ar-EG',
  'ar-SA',
  'ar-AE',
  'ar-MA',
  'ar-IQ',
  'ar-JO',
  'ar-LB',
  'ar-LY',
  'ar-DZ',
  'ar-BH',
  'ar-KW',
  'ar-OM',
  'ar-QA',
  'ar-SD',
  'ar-SY',
  'ar-TN',
  'ar-YE',
  'he',
  'he-IL',
  'fa',
  'fa-IR',
  'ur',
  'ur-PK',
  'ur-IN',
  'ku',
  'ku-TR',
  'sd',
  'sd-PK',
];

I18nManager.allowRTL(true);

const languageMapping: {[key: string]: string} = {
  'zh-CN': 'zh-Hans',
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (languageTag: string) => void) => {
    const locales = Localization.getLocales();
    let selectedLanguage = locales.find(locale =>
      Object.keys(resources).includes(
        languageMapping[locale.languageTag] || locale.languageTag,
      ),
    )?.languageTag;

    selectedLanguage =
      languageMapping[selectedLanguage!] || selectedLanguage || 'en';

    const isRTL = rtlLanguages.includes(selectedLanguage);
    I18nManager.forceRTL(isRTL);
    callback(selectedLanguage);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
