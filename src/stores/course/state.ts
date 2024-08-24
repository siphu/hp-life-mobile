import {Category, Course, TraineeCourse} from '~/api/model';

export interface StoreCourseState {
  categories: Record<string, Category[]>;
  latest: Record<string, Course[]>;
  enrolled: TraineeCourse[];
}

export const state: StoreCourseState = {
  categories: {},
  latest: {},
  enrolled: [],
};
