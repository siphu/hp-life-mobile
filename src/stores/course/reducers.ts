import {Course} from '~/api/model';
import {StoreCourseState, state as defaultState} from './state';

export enum CourseAction {
  SET_CATEGORY = 'SET_CATEGORY',
  SET_LATEST = 'SET_LATEST',
  SET_ENROLLED = 'SET_ENROLLED',
  UPDATE_ENROLLED = 'UPDATE_ENROLLED',
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
    default:
      return state;
  }
};
