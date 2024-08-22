import {config} from '~/config/config';
import {AuthToken, UserProfile} from '../model';
import {stores} from '~/stores';
import {get, post} from './restful';

export async function getUserProfile(): Promise<UserProfile> {
  return get<UserProfile>(`${config.api.identity}/api/account/profile`);
}

export async function refreshToken(token?: AuthToken): Promise<AuthToken> {
  const authToken = token
    ? token
    : //@ts-ignore
      stores.getState().user?.token;
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
