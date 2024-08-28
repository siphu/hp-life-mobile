import {Notification} from '~/api/endpoints';
import {AppAction} from './reducers';
import {Dispatch} from 'redux';

export const setLanguage = (locale: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AppAction.SET_LANGUAGE,
      payload: locale,
    });
    return Promise.resolve(locale);
  };
};

export const setOnlineStatus = (isOnline: boolean | null) => ({
  type: AppAction.SET_ONLINE_STATUS,
  payload: isOnline,
});

export const setNotifications = (notifications: Notification[]) => ({
  type: AppAction.SET_NOTIFICATIONS,
  payload: notifications,
});
