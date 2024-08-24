import {
  Category,
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

export async function getAllTraineeCourses(): Promise<TraineeCourse[]> {
  try {
    const result = await getTraineeCourses(0);

    if (!result.hasOwnProperty('page')) {
      throw new Error('Invalid response format');
    }
    const pageCount = result.pagesCount;
    if (pageCount <= 1) {
      return filterCourses(result.results);
    }

    const pageFetch: Array<Promise<TraineeCourseResult>> = [];
    for (let i = 1; i <= pageCount; i++) {
      pageFetch.push(getTraineeCourses(i));
    }

    const Results = await Promise.all(pageFetch);

    Results.forEach(R => {
      result.results = result.results.concat(R.results);
    });

    return filterCourses(result.results);
  } catch (error) {
    return Promise.reject(error);
  }
}

function filterCourses(courses: TraineeCourse[]): TraineeCourse[] {
  return courses.filter(
    c =>
      c.status === CourseStatus.Published ||
      c.status === CourseStatus.Test ||
      c.status === CourseStatus.Archived,
  );
}
