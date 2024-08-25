import {Category, Course, TraineeCourse} from '~/api/model';

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
