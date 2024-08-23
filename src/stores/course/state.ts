import {Category, Course} from '~/api/model';

export interface StoreCourseState {
  categories: Record<string, Category[]>;
  latest: Record<string, Course[]>;
}

export const state: StoreCourseState = {
  categories: {},
  latest: {},
};
