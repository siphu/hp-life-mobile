import I18n from 'react-native-i18n';
import ReactNative from 'react-native';
import {StoreAppType} from './actions';
import {StoreAppState, state as defaultState} from './state';

interface ReducerAppAction {
  type: StoreAppType;
  payload: object;
}

export const reducers = (
  state: StoreAppState = defaultState,
  action: ReducerAppAction,
): StoreAppState => {
  switch (action.type) {
    case StoreAppType.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload as unknown as string,
      };
    default:
      return state;
  }
};
