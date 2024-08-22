import {UserProfile} from '~/api/model';
import {AuthToken} from '~/types/auth';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
}

export const state: StoreUserState = {};
