import {StoreUserState} from './state';

export enum StoreUserAction {
  SET_TOKEN = 'SET_TOKEN',
  SET_REFRESH = 'SET_REFRESH',
  SET_PROFILE = 'SET_PROFILE',
}

export const setToken = (token: string) => {
  return {
    type: StoreUserAction.SET_TOKEN,
    payload: token,
  };
};

export const setRefreshToken = (token: string) => {
  return {
    type: StoreUserAction.SET_REFRESH,
    payload: token,
  };
};

export const setProfile = (profile: any) => {
  return {
    type: StoreUserAction.SET_PROFILE,
    payload: profile,
  };
};
