import {StoreAppState, state as defaultState} from './state';

export enum AppAction {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_ONLINE_STATUS = 'SET_ONLINE_STATUS',
  SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
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
    default:
      return state;
  }
};
