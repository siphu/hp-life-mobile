import {config} from '~/config/config';
import {AuthToken, CurrentAlertApiModel, UserProfile} from '../model';
import {stores} from '~/stores';
import {get, post} from './restful';
import {StoreUserState} from '~/stores/user/state';

export async function getUserProfile(): Promise<UserProfile> {
  return get<UserProfile>(`${config.api.identity}/api/account/profile`);
}

export async function refreshToken(token?: AuthToken): Promise<AuthToken> {
  const userState: StoreUserState = stores.getState().user!;
  const authToken = token ? token : (userState.token as AuthToken);
  return post<AuthToken>(
    `${config.api.identity}/api/Token`,
    {
      grant_type: 'refresh_token',
      refresh_token: authToken.refresh_token,
      client_id: config.api.client_id,
    },
    true,
    {
      Authorization: `Bearer ${token?.access_token}`,
    },
  );
}

export async function getCurrentAlert(
  locale: string,
): Promise<CurrentAlertApiModel[]> {
  return get<CurrentAlertApiModel[]>(`${config.api.alert}/alerts/current`, {
    language: locale,
  });
}
