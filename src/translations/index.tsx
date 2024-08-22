import ReactNative from 'react-native';
import RNRestart from 'react-native-restart';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import es from './locales/es.json';
import zhHans from './locales/zh-Hans.json';
import id from './locales/id.json';
import { useDispatch } from 'react-redux';
import { setLanguage } from '~/stores/app/actions';
import { Dispatch, UnknownAction } from 'redux';


I18n.translations = {
  en,
  fr,
  ar,
  hi,
  pt,
  es,
  'zh-Hans': zhHans,
  id: id,
};

I18n.locale = 'en';
I18n.fallbacks = true;
ReactNative.I18nManager.allowRTL(true);

export function t(name: string, params = {}) {
  return I18n.t(name, params);
}

const RestartApp = _.debounce(() => RNRestart.Restart(), 200);
export const changeLocale = (locale: string) => (dispatch: Dispatch) => {
  const isRTL: boolean = locale.indexOf('ar') === 0;
  const restartApp = ReactNative.I18nManager.isRTL !== isRTL;

  dispatch(setLanguage(locale));
  I18n.locale = locale;

  if (restartApp) {
    ReactNative.I18nManager.forceRTL(isRTL)
    RestartApp()
  };
}

export default I18n;
