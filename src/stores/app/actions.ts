import {StoreAppState} from './state';

export enum StoreAppType {
  SET_LANGUAGE = 'SET_LANGUAGE',
}

export const setLanguage = (locale: string) => {
  return {
    type: StoreAppType.SET_LANGUAGE,
    payload: locale,
  };
};
