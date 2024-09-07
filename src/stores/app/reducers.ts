import {Notification} from '~/api/endpoints';
import {StoreAppState, state as defaultState} from './state';
import notifee from '@notifee/react-native';

export enum AppAction {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_ONLINE_STATUS = 'SET_ONLINE_STATUS',
  SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
  MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  SET_SCREEN_ORIENTATION = 'SET_SCREEN_ORIENTATION',
}

interface ReducerAppAction {
  type: AppAction;
  payload: any;
}

export const reducers = (
  state: StoreAppState = defaultState,
  action: ReducerAppAction,
): StoreAppState => {
  switch (action.type) {
    case AppAction.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case AppAction.SET_ONLINE_STATUS:
      return {
        ...state,
        online: action.payload,
      };
    case AppAction.SET_NOTIFICATIONS:
      notifee.setBadgeCount(
        action.payload.filter((n: Notification) => !n.isRead).length,
      );
      return {
        ...state,
        notifications: action.payload,
      };
    case AppAction.MARK_NOTIFICATION_READ:
      let newNotifications = state.notifications.map(notification => {
        if (notification.id === action.payload)
          return {...notification, isRead: true};
        return notification;
      });
      notifee.setBadgeCount(
        newNotifications.filter((n: Notification) => !n.isRead).length,
      );
      return {
        ...state,
        notifications: newNotifications,
      };
    case AppAction.REMOVE_NOTIFICATION:
      notifee.setBadgeCount(
        state.notifications
          .filter(n => n.id !== action.payload.id)
          .filter((n: Notification) => !n.isRead).length,
      );

      return {
        ...state,
        notifications: state.notifications.filter(
          n => n.id !== action.payload.id,
        ),
      };
    case AppAction.SET_SCREEN_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };
    default:
      return state;
  }
};
