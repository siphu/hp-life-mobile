import {Category, Course, TraineeCourse} from '~/api/model';

export interface StoreCourseState {
  categories: Record<string, Category[]>;
  latest: Record<string, Course[]>;
  enrolled: TraineeCourse[];
  available: Record<string, Course[]>;
}

export const state: StoreCourseState = {
  categories: {},
  latest: {},
  enrolled: [],
  available: {},
};
