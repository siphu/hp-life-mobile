import {AuthToken, UserProfile} from '~/api/model';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
  alert?: string;
}

export const state: StoreUserState = {};
