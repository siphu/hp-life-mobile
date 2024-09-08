import { Course, TraineeCourse } from '~/api/endpoints';
import { StoreCourseState, state as defaultState } from './state';

export enum CourseAction {
  RESET_COURSE_STORE = 'RESET_COURSE_STORE',
  SET_CATEGORY = 'SET_CATEGORY',
  SET_ENROLLED = 'SET_ENROLLED',
  UPDATE_ENROLLED = 'UPDATE_ENROLLED',
  SET_AVAILABLE_COURSES = 'SET_AVAILABLE_COURSES',
  UPDATE_AVAILABLE_COURSES = 'UPDATE_AVAILABLE_COURSES',
}

interface ReducerAction {
  type: CourseAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export const reducers = (
  state: StoreCourseState = defaultState,
  action: ReducerAction,
): StoreCourseState => {
  switch (action.type) {
    case CourseAction.RESET_COURSE_STORE:
      return defaultState;

    case CourseAction.SET_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.language]: action.payload.categories,
        },
      };

    case CourseAction.SET_ENROLLED:
      return {
        ...state,
        enrolled: action.payload,
      };

    case CourseAction.UPDATE_ENROLLED: {
      const updatedEnrolledCourse = state.enrolled.map(
        item =>
          action.payload.find((updated: Course) => updated.id === item.id) ||
          item,
      );
      const newCourses = action.payload.filter(
        (newItem: Course) =>
          !state.enrolled.some(
            (existingItem: Course) => existingItem.id === newItem.id,
          ),
      );

      const updatedAvailable = Object.fromEntries(
        Object.entries(state.available).map(([key, courses]) => [
          key,
          courses.map(course => {
            const found = (action.payload as TraineeCourse[]).find(
              (updated: Course) => updated.id === course.id,
            );
            return found
              ? {
                  ...course,
                  traineeEnrollmentStatus: found.enrollmentStatus,
                  progress: found.progress,
                }
              : course;
          }),
        ]),
      );

      return {
        ...state,
        enrolled: [...updatedEnrolledCourse, ...newCourses],
        available: updatedAvailable,
      };
    }

    case CourseAction.SET_AVAILABLE_COURSES:
      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.language]: action.payload.courses,
        },
      };

    case CourseAction.UPDATE_AVAILABLE_COURSES: {
      const availableCourses = state.available[action.payload.language] || [];
      const updatedAvailableCourses = availableCourses.map(item => {
        return (
          action.payload.courses.find(
            (updated: Course) => updated.id === item.id,
          ) || item
        );
      });

      const newAvailableCourses = action.payload.courses.filter(
        (newItem: Course) =>
          !availableCourses.some(
            (existingItem: Course) => existingItem.id === newItem.id,
          ),
      );

      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.language]: [
            ...updatedAvailableCourses,
            ...newAvailableCourses,
          ],
        },
      };
    }

    default:
      return state;
  }
};
