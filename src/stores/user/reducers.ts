import {StoreUserState, state as defaultState} from './state';

export enum UserAction {
  SIGN_OUT = 'SIGN_OUT',
  SET_TOKEN = 'SET_TOKEN',
  SET_PROFILE = 'SET_PROFILE',
  SET_ALERTS = 'SET_ALERTS',
  SET_BADGES = 'SET_BADGES',
  SET_PUSH_NOTIFICATION_PREFERENCES = 'SET_PUSH_NOTIFICATION_PREFERENCES',
}

interface ReducerAction {
  type: UserAction;
  payload: any;
}

export const reducers = (
  state: StoreUserState = defaultState,
  action: ReducerAction,
): StoreUserState => {
  switch (action.type) {
    case UserAction.SIGN_OUT:
      return defaultState;
    case UserAction.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case UserAction.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case UserAction.SET_ALERTS:
      return {
        ...state,
        alerts: action.payload,
      };
    case UserAction.SET_BADGES:
      return {
        ...state,
        badges: action.payload,
      };
    case UserAction.SET_PUSH_NOTIFICATION_PREFERENCES:
      return {
        ...state,
        preferencePushNotification: action.payload,
      };
    default:
      return state;
  }
};
