import {StoreAppState, state as defaultState} from './state';

export enum AppAction {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_ONLINE_STATUS = 'SET_ONLINE_STATUS',
  SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
  MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
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
      return {
        ...state,
        notifications: action.payload,
      };
    case AppAction.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => {
          if (notification.id === action.payload)
            return {...notification, isRead: true};
          return notification;
        }),
      };
    case AppAction.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          n => n.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
