import {CourseStatus, TraineeCourse} from '~/api/model';
import {getTraineeCourses} from '~/api/rest/courses';
import {stores} from '~/stores';
import {
  setCategory,
  setEnrolledCourses,
  setLatest,
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
