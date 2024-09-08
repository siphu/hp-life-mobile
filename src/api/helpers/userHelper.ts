import {
  AuthToken,
  MyBadge,
  Notification,
  TraineeCourse,
  UserProfile,
} from '../endpoints/model';
import {
  refreshToken as remoteRefreshToken,
  getUserProfile as remoteGetUserProfile,
  updateUserProfile as remoteUpdateUserProfile,
  getCurrentAlert as remoteGetAlert,
  getEmailMarketingSetting,
  setEmailMarketingSetting,
  getNotifications as remoteGetNotifications,
  getMyBadges as remoteGetMyBadges,
  unregisterFCM,
  markNotificationsRead as remoteMarkNotificationRead,
  clearNotifications as remoteClearNotifications,
  deleteNotification as remoteDeleteNotification,
  registerFCM,
  analyticsBadgeSharing,
  checkFCMRegistration,
  analyticsCertificateSharing,
  downloadCertificate as remoteDownloadCertificate,
  downloadTranscript as remoteDownloadTransaction,
} from '~/api/endpoints';
import { stores } from '~/stores';
import { StoreAppState } from '~/stores/app/state';
import { CourseAction } from '~/stores/course/reducers';
import {
  setAlerts,
  setBadges,
  setProfile,
  setPushRegistered,
  setToken,
} from '~/stores/user/actions';
import { UserAction } from '~/stores/user/reducers';
import { StoreUserState } from '~/stores/user/state';
import notifee from '@notifee/react-native';
import {
  removeNotification,
  setNotificationRead,
  setNotifications,
} from '~/stores/app/actions';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import Share from 'react-native-share';
import { config } from '~/config/config';
import { clearCacheTimer } from '.';

let lastRemoteMessageCalled: number | null = null;

/* cache duration in seconds */

const MESSAGE_CACHE_DURATION = 600;

export const getRemoteMessages = async () => {
  const appState: StoreAppState = stores.getState().app!;
  const userState: StoreUserState = stores.getState().user!;

  const currentTime = Date.now();
  const cacheDuration = MESSAGE_CACHE_DURATION * 1000;

  const shouldUseCache =
    !userState.profile ||
    appState.online !== true ||
    (lastRemoteMessageCalled &&
      currentTime - lastRemoteMessageCalled < cacheDuration);

  if (shouldUseCache) {
    return userState.alerts;
  }

  lastRemoteMessageCalled = currentTime;
  const alerts = await remoteGetAlert(userState.profile!.language);
  stores.dispatch(setAlerts(alerts));

  return alerts;
};

export const checkAndRefreshToken = async (
  token?: AuthToken,
): Promise<AuthToken> => {
  const userState: StoreUserState = stores.getState().user!;

  const authToken = token ? token : (userState.token as AuthToken);
  const decodedToken = jwtDecode(authToken.access_token);

  if (decodedToken.exp) {
    const expirationTime = moment.unix(decodedToken.exp);
    const threeDaysFromNow = moment().add(3, 'days');
    const willExpireSoon = expirationTime.isBefore(threeDaysFromNow);
    if (!willExpireSoon) return authToken;
  }
  return remoteRefreshToken(authToken);
};

export const refreshToken = (token?: AuthToken) => {
  if (token) {
    /* when a token is given, we should clear the cache timer. this typical only triggers on sign in */
    clearCacheTimer();
  }
  return checkAndRefreshToken(token)
    .then(setToken)
    .then(stores.dispatch)
    .catch(e => console.error('error', e));
};

export const getUserProfile = () => {
  return Promise.all([
    remoteGetUserProfile(),
    getEmailMarketingSetting().catch(e => null),
    messaging()
      .getToken()
      .then(checkFCMRegistration)
      .catch(e => false),
  ])
    .then(([profile, marketing, pushRegistered]) => {
      stores.dispatch(setPushRegistered(pushRegistered));
      profile.isNewsletterEnabled =
        (marketing && marketing.isNewsletterEnabled) || false;
      return profile;
    })
    .then(setProfile)
    .then(stores.dispatch)
    .catch(() => {
      signOut();
    });
};

export const updateUserProfile = (userProfile: UserProfile) => {
  remoteUpdateUserProfile(userProfile)
    .then(() => setProfile(userProfile))
    .then(stores.dispatch)
    .then(() =>
      setEmailMarketingSetting(userProfile.isNewsletterEnabled).catch(() => {}),
    );
};

export const signOut = async () => {
  await unRegisterDeviceForMessaging().catch(() => {});
  stores.dispatch({ type: CourseAction.RESET_COURSE_STORE });
  stores.dispatch(setNotifications([]));
  stores.dispatch({ type: UserAction.SIGN_OUT });
  clearCacheTimer();
};

export const unRegisterDeviceForMessaging = async () => {
  try {
    await unregisterFCM(await messaging().getToken());
    await messaging().unregisterDeviceForRemoteMessages();
    stores.dispatch(setPushRegistered(false));
  } catch {}
  await notifee.setBadgeCount(0);
};

export const registerDeviceForMessaging = async () => {
  await firebase.messaging().registerDeviceForRemoteMessages();
  const fcmToken = await messaging().getToken();
  await registerFCM(fcmToken).catch(e => null);
  stores.dispatch(setPushRegistered(true));
};

export const getPushNotifications = () => {
  return Promise.all(
    [remoteGetNotifications(), remoteGetMyBadges()].map(p => p.catch(e => e)),
  ).then(([notifications, badges]) => {
    const notificationChecked: Notification[] = notifications.hasOwnProperty(
      'error_message',
    )
      ? []
      : notifications;
    const badgeChecked = badges.hasOwnProperty('error_message') ? [] : badges;
    stores.dispatch(setNotifications(notificationChecked));
    stores.dispatch(setBadges(badgeChecked));
  });
};

export const markNotificationsRead = (notification: Notification) => {
  return remoteMarkNotificationRead(notification.id)
    .then(() => setNotificationRead(notification.id))
    .then(stores.dispatch)
    .catch(() => {});
};

export const clearNotifications = () => {
  return remoteClearNotifications()
    .then(() => setNotifications([]))
    .then(stores.dispatch)
    .catch(() => {});
};

export const deleteNotification = (notification: Notification) => {
  return remoteDeleteNotification(notification.id)
    .then(() => removeNotification(notification))
    .then(stores.dispatch)
    .catch(() => {});
};

export const shareBadge = async (badge: MyBadge) => {
  const language = stores.getState().app.language;
  Share.open({
    url: `${config.api.webUrl}/${language}/badges/${badge.id}`,
  })
    .then(() => {
      analyticsBadgeSharing(badge.id as string);
    })
    .catch(() => {});
};

export const shareCertificate = async (course: TraineeCourse) => {
  const language = stores.getState().app.language;
  Share.open({
    url: `${config.api.webUrl}/certificate/${course.certificateId!}`,
  })
    .then(() => {
      analyticsCertificateSharing(course.certificateId!);
    })
    .catch(() => {});
};

export const downloadCertificate = async (course: TraineeCourse) => {
  return remoteDownloadCertificate(
    course.certificateId!,
    'certificate.pdf',
    'application/pdf',
  );
};

export const downloadTranscript = async () => {
  return remoteDownloadTransaction('transcript.pdf', 'application/pdf');
};

export const clearUserCacheTimer = () => {
  lastRemoteMessageCalled = null;
};
