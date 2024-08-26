import {StoreAppType} from './reducers';
import {Dispatch} from 'redux';

export const setLanguage = (locale: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: StoreAppType.SET_LANGUAGE,
      payload: locale,
    });
    return Promise.resolve(locale);
  };
};
