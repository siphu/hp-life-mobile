import {AuthToken, CurrentAlertApiModel, UserProfile} from '~/api/model';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
  alerts: CurrentAlertApiModel[];
}

export const state: StoreUserState = {
  alerts: [],
};
