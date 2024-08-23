import {CourseAction} from './reducers';
import {AuthToken, Category, Course, UserProfile} from '~/api/model';

export const setCategory = (language: string, categories: Category[]) => {
  return {
    type: CourseAction.SET_CATEGORY,
    payload: {language: language, categories: categories},
  };
};

export const setLatest = (language: string, courses: Course[]) => {
  return {
    type: CourseAction.SET_LATEST,
    payload: {language: language, courses: courses},
  };
};
