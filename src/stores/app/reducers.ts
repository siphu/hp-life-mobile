import {StoreAppState, state as defaultState} from './state';

export enum StoreAppType {
  SET_LANGUAGE = 'SET_LANGUAGE',
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

    default:
      return state;
  }
};
