import {CourseAction} from './reducers';
import {Category, Course} from '~/api/endpoints';
import {Dispatch} from 'redux';

export const setCategory = (language: string, categories: Category[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CourseAction.SET_CATEGORY,
      payload: {language: language, categories: categories},
    });
  };
};

export const setEnrolledCourses = (courses: Course[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CourseAction.SET_ENROLLED,
      payload: courses,
    });
    return Promise.resolve(courses);
  };
};

export const updateEnrolledCourses = (courses: Course[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CourseAction.UPDATE_ENROLLED,
      payload: courses,
    });
    return Promise.resolve(courses);
  };
};

export const setAvailableCourses = (language: string, courses: Course[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CourseAction.SET_AVAILABLE_COURSES,
      payload: {language: language, courses: courses},
    });
    return Promise.resolve(courses);
  };
};

export const updateAvailableCourses = (language: string, courses: Course[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CourseAction.UPDATE_AVAILABLE_COURSES,
      payload: {language: language, courses: courses},
    });
    return Promise.resolve(courses);
  };
};
