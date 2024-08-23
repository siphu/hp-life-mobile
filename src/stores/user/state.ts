import {AuthToken, UserProfile} from '~/api/model';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
}

export const state: StoreUserState = {};
