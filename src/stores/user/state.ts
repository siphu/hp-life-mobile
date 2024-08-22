import {AuthToken} from '~/types/auth';

export interface StoreUserState {
  token?: AuthToken;
  profile?: any;
}

export const state: StoreUserState = {};
