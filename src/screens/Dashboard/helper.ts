import {getTraineeCourses} from '~/api/rest/courses';
import {stores} from '~/stores';
import {
  setCategory,
  setEnrolledCourses,
  setLatest,
  updateEnrolledCourses,
} from '~/stores/course/actions';

export const getEnrolledCourses = async (force?: boolean) => {
  if (force) {
    await stores.dispatch(setEnrolledCourses([]));
  }
  let page = 0;
  let finished = false;
  do {
    const result = await getTraineeCourses(page, 500);
    await stores.dispatch(updateEnrolledCourses(result.results));
    ++page;
    finished = page >= result.pagesCount;
  } while (!finished);
};
