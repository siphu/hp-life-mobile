import {
  AuthToken,
  CurrentAlertApiModel,
  MyBadge,
  UserProfile,
} from '~/api/endpoints';

export interface StoreUserState {
  token?: AuthToken;
  profile?: UserProfile;
  alerts: CurrentAlertApiModel[];
  badges: MyBadge[];
  preferencePushNotification?: boolean;
  pushRegistered: boolean;
}

export const state: StoreUserState = {
  alerts: [],
  badges: [],
  pushRegistered: false,
};
