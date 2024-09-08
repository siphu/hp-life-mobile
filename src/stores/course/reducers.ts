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
      let newCategories = { ...state.categories };
      newCategories[action.payload.language] = action.payload.categories;
      return {
        ...state,
        categories: newCategories,
      };
    case CourseAction.SET_ENROLLED:
      return {
        ...state,
        enrolled: action.payload,
      };
    case CourseAction.UPDATE_ENROLLED:
      let updatedEnrolledCourse = state.enrolled.map(
        item =>
          action.payload.find((updated: Course) => updated.id === item.id) ||
          item,
      );
      let newCourses = action.payload.filter(
        (newItem: Course) =>
          !state.enrolled.some(
            (existingItem: Course) => existingItem.id === newItem.id,
          ),
      );
      // Update the available courses progress and enrollment status
      let updatedAvailable = Object.fromEntries(
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

    case CourseAction.SET_AVAILABLE_COURSES:
      let availableCourses = { ...state.available };
      availableCourses[action.payload.language] = action.payload.courses;
      return {
        ...state,
        available: availableCourses,
      };
    case CourseAction.UPDATE_AVAILABLE_COURSES: {
      let availableCourses = { ...state.available };
      let language = action.payload.language;
      let languageCourses = availableCourses[language] || [];
      let updatedAvailableCourses = languageCourses.map(item => {
        return (
          action.payload.courses.find(
            (updated: Course) => updated.id === item.id,
          ) || item
        );
      });
      let newAvailableCourses = (action.payload.courses as Course[]).filter(
        newItem => {
          return !languageCourses.some(
            (existingItem: Course) => existingItem.id === newItem.id,
          );
        },
      );

      availableCourses[language] = [
        ...updatedAvailableCourses,
        ...newAvailableCourses,
      ];
      return {
        ...state,
        available: availableCourses,
      };
    }
    default:
      return state;
  }
};
