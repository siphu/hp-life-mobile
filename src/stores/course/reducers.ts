import {StoreCourseState, state as defaultState} from './state';

export enum CourseAction {
  SET_CATEGORY = 'SET_CATEGORY',
  SET_LATEST = 'SET_LATEST',
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
    default:
      return state;
  }
};
