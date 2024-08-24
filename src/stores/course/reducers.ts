import {Course} from '~/api/model';
import {StoreCourseState, state as defaultState} from './state';

export enum CourseAction {
  SET_CATEGORY = 'SET_CATEGORY',
  SET_LATEST = 'SET_LATEST',
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
    case CourseAction.SET_CATEGORY:
      let newCategories = {...state.categories};
      newCategories[action.payload.language] = action.payload.categories;
      return {
        ...state,
        categories: newCategories,
      };
    case CourseAction.SET_LATEST:
      let newLatest = {...state.latest};
      newLatest[action.payload.language] = action.payload.courses;
      return {
        ...state,
        latest: newLatest,
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
      return {
        ...state,
        enrolled: [...updatedEnrolledCourse, ...newCourses],
      };

    case CourseAction.SET_AVAILABLE_COURSES:
      let availableCourses = {...state.available};
      availableCourses[action.payload.language] = action.payload.courses;
      return {
        ...state,
        available: availableCourses,
      };
    case CourseAction.UPDATE_AVAILABLE_COURSES: {
      let availableCourses = {...state.available};
      const language = action.payload.language;
      const languageCourses = availableCourses[language] || [];
      const updatedAvailableCourses = languageCourses.map(item => {
        return (
          action.payload.courses.find(
            (updated: Course) => updated.id === item.id,
          ) || item
        );
      });
      const newAvailableCourses = (action.payload.courses as Course[]).filter(
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
