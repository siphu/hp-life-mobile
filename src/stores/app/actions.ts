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

export const setNotificationRead = (id: number) => ({
  type: AppAction.MARK_NOTIFICATION_READ,
  payload: id,
});

export const removeNotification = (notification: Notification) => ({
  type: AppAction.REMOVE_NOTIFICATION,
  payload: notification,
});

export const setScreenOrientation = (
  orientation: 'Portrait' | 'Landscape',
) => ({
  type: AppAction.SET_SCREEN_ORIENTATION,
  payload: orientation,
});

export const setLoader = (visible: boolean) => ({
  type: AppAction.SET_LOADER,
  payload: visible,
});
