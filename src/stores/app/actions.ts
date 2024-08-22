import {StoreAppType} from './reducers';

export const setLanguage = (locale: string) => {
  return {
    type: StoreAppType.SET_LANGUAGE,
    payload: locale,
  };
};
