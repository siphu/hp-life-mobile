import {
  Category,
  Course,
  CourseResult,
  CourseStatus,
  TraineeCourse,
  TraineeCourseResult,
} from '../model';
import {config} from '~/config/config';
import {get} from './restful';

const PAGE_LIMIT = 500;

export async function getCategories(locale: string): Promise<Category[]> {
  return get<Category[]>(
    `${config.api.learning}/api/categories?language=${locale}&hideEmpty=true`,
  );
}
export async function getLatestCourses(
  limit?: number,
  locale?: string,
): Promise<CourseResult> {
  const resultsPerPage = limit || 20;
  const localeString = locale ? `language=${locale}` : '';
  return get<CourseResult>(
    `${config.api.learning}/api/marketplace/courses?resultsPerPage=${resultsPerPage}&sortBy=newest&${localeString}`,
  );
}
export async function getTraineeCourses(
  page?: number,
  limit: number = PAGE_LIMIT,
): Promise<TraineeCourseResult> {
  return get<TraineeCourseResult>(
    `${config.api.learning}/api/trainee/courses?resultsPerPage=${limit}&page=${
      page || 0
    }`,
  );
}

export async function getAvailableCourses(
  locale: string,
  page: number = 0,
  limit: number = PAGE_LIMIT,
  categoryId?: number,
  search?: string,
): Promise<CourseResult> {
  const localeString = locale ? `language=${locale}` : '';

  let baseUrl = `${config.api.learning}/api/marketplace/courses?resultsPerPage=${limit}&sortBy=newest&${localeString}&page=${page}`;

  if (categoryId) {
    baseUrl += `&categoryId=${categoryId}`;
  }

  if (search) {
    baseUrl += `&search=${encodeURIComponent(search)}`;
  }

  return get<CourseResult>(baseUrl);
}
