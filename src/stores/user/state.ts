export interface StoreUserState {
  token?: string;
  refresh_token?: string;
  profile?: any;
}

export const state: StoreUserState = {};
