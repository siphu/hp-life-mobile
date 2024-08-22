import {StoreUserAction} from './reducers';
import {AuthToken, UserProfile} from '~/api/model';

export const setProfile = (profile: UserProfile) => {
  return {
    type: StoreUserAction.SET_PROFILE,
    payload: profile,
  };
};

export const setToken = (token?: AuthToken) => {
  return {
    type: StoreUserAction.SET_TOKEN,
    payload: token,
  };
};
