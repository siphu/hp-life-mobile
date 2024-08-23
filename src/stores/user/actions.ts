import {UserAction} from './reducers';
import {AuthToken, UserProfile} from '~/api/model';

export const setProfile = (profile: UserProfile) => {
  return {
    type: UserAction.SET_PROFILE,
    payload: profile,
  };
};

export const setToken = (token?: AuthToken) => {
  return {
    type: UserAction.SET_TOKEN,
    payload: token,
  };
};
