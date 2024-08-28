import {Category, Course, TraineeCourse} from '~/api/endpoints';

export interface StoreCourseState {
  categories: Record<string, Category[]>;
  enrolled: TraineeCourse[];
  available: Record<string, Course[]>;
}

export const state: StoreCourseState = {
  categories: {},
  enrolled: [],
  available: {},
};
