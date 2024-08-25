import {Course, CourseStatus, TraineeCourse} from '~/api/model';
import {
  getAvailableCourses as getRemoteAvailableCourses,
  getCategories as getRemoteCategories,
  getTraineeCourses,
} from '~/api/rest/courses';
import {stores} from '~/stores';
import {StoreAppState} from '~/stores/app/state';
import {
  setAvailableCourses,
  setCategory,
  setEnrolledCourses,
  updateAvailableCourses,
  updateEnrolledCourses,
} from '~/stores/course/actions';
import {StoreCourseState} from '~/stores/course/state';

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
  if (!courseState.categories[lang] || force) {
    const categories = await getRemoteCategories(lang);
    await stores.dispatch(setCategory(lang, categories));
    return categories;
  }

  return courseState.categories[lang];
};

export const getEnrolledCourses = async (
  force?: boolean,
): Promise<TraineeCourse[]> => {
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
  return (stores.getState().course! as StoreCourseState).enrolled;
};

export const getAvailableCourses = async (
  force?: boolean,
): Promise<Course[]> => {
  const appState: StoreAppState = stores.getState().app!;
  const language = appState.language;

  await getCategories(force);

  if (force) await stores.dispatch(setAvailableCourses(language, []));

  let page = 0;
  let finished = false;
  do {
    const result = await getRemoteAvailableCourses(appState.language, page);
    await stores.dispatch(updateAvailableCourses(language, result.results));
    ++page;
    finished = page >= result.pagesCount - 1;
  } while (!finished);

  return (stores.getState().course! as StoreCourseState).available![language];
};
