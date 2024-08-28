import {
  AuthToken,
  Course,
  CourseStatus,
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
} from '~/api/endpoints/user';
import {stores} from '~/stores';
import {StoreAppState} from '~/stores/app/state';
import {CourseAction} from '~/stores/course/reducers';
import {setAlerts, setProfile, setToken} from '~/stores/user/actions';
import {UserAction} from '~/stores/user/reducers';
import {StoreUserState} from '~/stores/user/state';

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

  const alerts = await remoteGetAlert(userState.profile!.language);
  stores.dispatch(setAlerts(alerts));
  lastRemoteMessageCalled = currentTime;
  return alerts;
};

export const refreshToken = (token?: AuthToken) => {
  return remoteRefreshToken(token).then(setToken).then(stores.dispatch);
};

export const getUserProfile = () => {
  return Promise.all([
    remoteGetUserProfile(),
    getEmailMarketingSetting().catch(e => null),
  ])
    .then(([profile, marketing]) => {
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

export const signOut = () => {
  stores.dispatch({type: CourseAction.RESET_COURSE_STORE});
  stores.dispatch({type: UserAction.SIGN_OUT});
};
