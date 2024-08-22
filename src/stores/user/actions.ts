import {StoreUserAction} from './reducers';
import {StoreUserState} from './state';

export const setProfile = (profile: any) => {
  return {
    type: StoreUserAction.SET_PROFILE,
    payload: profile,
  };
};

export const setLogin = (path?: string) => {
  if (path) {
    const url = new URL(path);
    const access_token = url.searchParams.get('token');
    const refresh_token = url.searchParams.get('refresh_token');
    if (access_token && refresh_token) {
      const token = {
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: url.searchParams.get('expires_in') ?? 0,
        token_type: url.searchParams.get('token_type') ?? 'bearer',
      };
      return {
        type: StoreUserAction.SET_TOKEN,
        payload: token,
      };
    }
  }
  return {
    type: StoreUserAction.SET_TOKEN,
    payload: undefined,
  };
};
