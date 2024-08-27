import {StoreAppState, state as defaultState} from './state';

export enum StoreAppType {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_ONLINE_STATUS = 'SET_ONLINE_STATUS',
}

interface ReducerAppAction {
  type: StoreAppType;
  payload: any;
}

export const reducers = (
  state: StoreAppState = defaultState,
  action: ReducerAppAction,
): StoreAppState => {
  switch (action.type) {
    case StoreAppType.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case StoreAppType.SET_ONLINE_STATUS:
      return {
        ...state,
        online: action.payload,
      };
    default:
      return state;
  }
};
