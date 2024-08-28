import {config} from '~/config/config';
import {
  AuthToken,
  CurrentAlertApiModel,
  EmailMarketingAccountSetting,
  MyBadge,
  Notification,
  NotificationsResults,
  UserProfile,
} from './model';
import {stores} from '~/stores';
import {get, post, put, remove} from '../client/restful';
import {StoreUserState} from '~/stores/user/state';

const PAGE_LIMIT = 500;

export async function getUserProfile(): Promise<UserProfile> {
  return get<UserProfile>(`${config.api.identity}/api/account/profile`);
}

export async function updateUserProfile(
  profileData: UserProfile,
): Promise<void> {
  return await put<void>(
    `${config.api.identity}/api/account/profile`,
    profileData,
  );
}

export async function getEmailMarketingSetting(): Promise<EmailMarketingAccountSetting> {
  return get<EmailMarketingAccountSetting>(
    `${config.api.marketing}/Account/settings`,
  );
}

export async function setEmailMarketingSetting(
  newsLetterEnabled?: boolean,
): Promise<void> {
  return put<void>(`${config.api.marketing}/Account/settings`, {
    isNewsletterEnabled: newsLetterEnabled ?? true,
  });
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

export async function getNotifications(): Promise<Notification[]> {
  let base_url = `${config.api.push}/Notifications?resultsPerPage=${PAGE_LIMIT}`;
  let result = await get<NotificationsResults>(base_url);
  if (result.hasOwnProperty('page')) {
    const pageCount = result.pagesCount;

    if (pageCount > 1) {
      let pageFetch: Array<Promise<NotificationsResults>> = [];
      for (let i = 1; i < pageCount; ++i) {
        pageFetch.push(get<NotificationsResults>(`${base_url}&page=${i}`));
      }
      return Promise.all(pageFetch).then((Results: NotificationsResults[]) => {
        Results.forEach((R: NotificationsResults) => {
          result.results = result.results.concat(R.results);
        });
        return Promise.resolve(result.results);
      });
    } else {
      return Promise.resolve(result.results);
    }
  } else {
    return Promise.reject(result);
  }
}

export async function clearNotifications() {
  return remove<void>(`${config.api.push}/Notifications`);
}
export async function markNotificationsRead(notificationId: number) {
  return post<void>(`${config.api.push}/Notifications/${notificationId}/read`);
}
export async function deleteNotification(notificationId: number) {
  return remove<void>(`${config.api.push}/Notifications/${notificationId}`);
}
export async function getMyBadges(locale?: string): Promise<MyBadge[]> {
  const localeString = locale ? `?language=${locale}` : '';
  return get<MyBadge[]>(`${config.api.rewards}/MyBadges${localeString}`);
}

export async function unregisterFCM(fcm: string): Promise<void> {
  return remove<void>(
    `${config.api.push}/Account/pushNotificationTokens/${fcm}`,
  );
}
