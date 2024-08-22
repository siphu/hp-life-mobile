import {StoreUserAction} from './actions';
import {StoreUserState, state as defaultState} from './state';

interface ReducerAppAction {
  type: StoreUserAction;
  payload: object;
}

export const reducers = (
  state: StoreUserState = defaultState,
  action: ReducerAppAction,
): StoreUserState => {
  switch (action.type) {
    case StoreUserAction.SET_TOKEN:
      return {
        ...state,
        token: action.payload as unknown as string,
      };
    case StoreUserAction.SET_REFRESH:
      return {
        ...state,
        refresh_token: action.payload as unknown as string,
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
