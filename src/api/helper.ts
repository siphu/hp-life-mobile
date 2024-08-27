import {AuthToken, Course, CourseStatus, TraineeCourse} from '~/api/model';
import {
  getAvailableCourses as getRemoteAvailableCourses,
  getCategories as getRemoteCategories,
  getTraineeCourses,
} from '~/api/rest/courses';
import {
  refreshToken as remoteRefreshToken,
  getUserProfile as remoteGetUserProfile,
} from '~/api/rest/user';
import {stores} from '~/stores';
import {StoreAppState} from '~/stores/app/state';
import {
  setAvailableCourses,
  setCategory,
  setEnrolledCourses,
  updateAvailableCourses,
  updateEnrolledCourses,
} from '~/stores/course/actions';
import {CourseAction} from '~/stores/course/reducers';
import {StoreCourseState} from '~/stores/course/state';
import {setProfile, setToken} from '~/stores/user/actions';
import {UserAction} from '~/stores/user/reducers';

let lastCategoryFetchTime: number | null = null;
let lastEnrolledCoursesFetchTime: number | null = null;
let lastAvailableCoursesFetchTime: number | null = null;
let lastRemoteMessageCalled: number | null = null;

/* cache duration in seconds */
const CATEGORY_CACHE_DURATION = 60;
const ENROLLED_CACHE_DURATION = 10;
const COURSE_CACHE_DURATION = 30;
const MESSAGE_CACHE_DURATION = 10;

const filterCourses = (courses: TraineeCourse[]): TraineeCourse[] => {
  return courses.filter(
    c =>
      c.status === CourseStatus.Published ||
      c.status === CourseStatus.Test ||
      c.status === CourseStatus.Archived,
  );
};

export const getCategories = async (force?: boolean) => {
  const appState: StoreAppState = stores.getState().app!;
  const courseState: StoreCourseState = stores.getState().course!;
  const lang = appState.language;

  const currentTime = Date.now();
  const cacheDuration = CATEGORY_CACHE_DURATION * 1000;

  const cachedCategories = courseState.categories[lang];
  const shouldUseCache =
    appState.online !== true ||
    (cachedCategories &&
      lastCategoryFetchTime &&
      currentTime - lastCategoryFetchTime < cacheDuration &&
      !force);

  if (shouldUseCache) {
    return cachedCategories!;
  }

  if (!cachedCategories || force) {
    const categories = await getRemoteCategories(lang);
    await stores.dispatch(setCategory(lang, categories));
    lastCategoryFetchTime = currentTime;
    return categories;
  }

  return cachedCategories!;
};

export const getEnrolledCourses = async (
  force?: boolean,
): Promise<TraineeCourse[]> => {
  const appState: StoreAppState = stores.getState().app!;
  const courseState: StoreCourseState = stores.getState().course!;
  const currentTime = Date.now();
  const cacheDuration = ENROLLED_CACHE_DURATION * 1000;

  const shouldUseCache =
    appState.online !== true ||
    (lastEnrolledCoursesFetchTime &&
      currentTime - lastEnrolledCoursesFetchTime < cacheDuration &&
      !force);

  if (shouldUseCache) {
    return courseState.enrolled;
  }

  if (force) {
    await stores.dispatch(setEnrolledCourses([]));
  }

  let page = 0;
  let finished = false;

  do {
    const result = await getTraineeCourses(page);
    await stores.dispatch(updateEnrolledCourses(filterCourses(result.results)));
    ++page;
    finished = page >= result.pagesCount - 1;
  } while (!finished);

  lastEnrolledCoursesFetchTime = currentTime;

  return courseState.enrolled;
};

export const getAvailableCourses = async (
  force?: boolean,
): Promise<Course[]> => {
  const appState: StoreAppState = stores.getState().app!;
  const language = appState.language;

  const currentTime = Date.now();
  const cacheDuration = COURSE_CACHE_DURATION * 1000;

  const shouldUseCache =
    appState.online !== true ||
    (lastAvailableCoursesFetchTime &&
      currentTime - lastAvailableCoursesFetchTime < cacheDuration &&
      !force);

  if (shouldUseCache) {
    return (stores.getState().course! as StoreCourseState).available![language];
  }

  await getCategories(force);

  if (force) {
    await stores.dispatch(setAvailableCourses(language, []));
  }

  let page = 0;
  let finished = false;
  do {
    const result = await getRemoteAvailableCourses(appState.language, page);
    await stores.dispatch(updateAvailableCourses(language, result.results));
    ++page;
    finished = page >= result.pagesCount - 1;
  } while (!finished);

  lastAvailableCoursesFetchTime = currentTime;

  return (stores.getState().course! as StoreCourseState).available![language];
};

export const getRemoteMessages = async (force?: boolean) => {
  const appState: StoreAppState = stores.getState().app!;

  const currentTime = Date.now();
  const cacheDuration = MESSAGE_CACHE_DURATION * 1000;

  const shouldUseCache =
    appState.online !== true ||
    (lastRemoteMessageCalled &&
      currentTime - lastRemoteMessageCalled < cacheDuration &&
      !force);

  if (shouldUseCache) {
    return ['abc'];
  }

  await fetchRemoteMessages();
  lastRemoteMessageCalled = currentTime;

  return ['abc'];
};

async function fetchRemoteMessages() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['Message 1', 'Message 2', 'Message 3']);
    }, 250);
  });
}

export const refreshToken = (token?: AuthToken) => {
  return remoteRefreshToken(token).then(setToken).then(stores.dispatch);
};

export const getUserProfile = () => {
  return remoteGetUserProfile()
    .then(setProfile)
    .then(stores.dispatch)
    .catch(() => {
      signOut();
    });
};

export const signOut = () => {
  stores.dispatch({type: CourseAction.RESET_COURSE_STORE});
  stores.dispatch({type: UserAction.SIGN_OUT});
};
