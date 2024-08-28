import {AuthToken, CurrentAlertApiModel, UserProfile} from '~/api/endpoints';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
  alerts: CurrentAlertApiModel[];
}

export const state: StoreUserState = {
  alerts: [],
};
