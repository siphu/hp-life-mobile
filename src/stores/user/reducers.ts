import {StoreUserState, state as defaultState} from './state';

export enum UserAction {
  SET_TOKEN = 'SET_TOKEN',
  SET_PROFILE = 'SET_PROFILE',
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
    default:
      return state;
  }
};
