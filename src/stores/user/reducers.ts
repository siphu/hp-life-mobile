import {StoreUserState, state as defaultState} from './state';

export enum UserAction {
  SIGN_OUT = 'SIGN_OUT',
  SET_TOKEN = 'SET_TOKEN',
  SET_PROFILE = 'SET_PROFILE',
  SET_ALERTS = 'SET_ALERTS',
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
    default:
      return state;
  }
};
