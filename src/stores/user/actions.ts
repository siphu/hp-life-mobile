import {UserAction} from './reducers';
import {
  AuthToken,
  CurrentAlertApiModel,
  MyBadge,
  UserProfile,
} from '~/api/endpoints';

export const setProfile = (profile?: UserProfile) => {
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

export const setAlerts = (alerts: CurrentAlertApiModel[]) => {
  return {
    type: UserAction.SET_ALERTS,
    payload: alerts,
  };
};

export const setBadges = (badges: MyBadge[]) => ({
  type: UserAction.SET_BADGES,
  payload: badges,
});
