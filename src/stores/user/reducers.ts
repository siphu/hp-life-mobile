import {StoreUserState, state as defaultState} from './state';

export enum StoreUserAction {
  SET_TOKEN = 'SET_TOKEN',
  SET_PROFILE = 'SET_PROFILE',
}

interface ReducerAppAction {
  type: StoreUserAction;
  payload: any;
}

export const reducers = (
  state: StoreUserState = defaultState,
  action: ReducerAppAction,
): StoreUserState => {
  switch (action.type) {
    case StoreUserAction.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case StoreUserAction.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
