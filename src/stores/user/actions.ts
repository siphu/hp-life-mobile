import {UserAction} from './reducers';
import {AuthToken, CurrentAlertApiModel, UserProfile} from '~/api/model';

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
