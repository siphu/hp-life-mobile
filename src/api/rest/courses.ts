import {Category, CourseResult} from '../model';
import {config} from '~/config/config';
import {get} from './restful';

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
