import {
  getCategories,
  getLatestCourses as getRemoteLatestCourses,
} from '~/api/rest/courses';
import {RootState, stores} from '~/stores';
import {setCategory, setLatest} from '~/stores/course/actions';

export const getCourses = async (force?: boolean) => {
  const store = stores.getState() as unknown as RootState;
  const lang = store.app.language || 'en';
  if (!store.course.categories[lang] || force) {
    const categories = await getCategories(lang);
    stores.dispatch(setCategory(lang, categories));
    return categories;
  }
  return store.course.categories[lang];
};

export const getLatestCourses = async (force?: boolean) => {
  const store = stores.getState() as unknown as RootState;
  const lang = store.app.language || 'en';
  await getCourses(force);
  if (!store.course.latest[lang] || force) {
    const courses = (await getRemoteLatestCourses(15, lang)).results;
    stores.dispatch(setLatest(lang, courses));
    return courses;
  }
  return store.course.latest[lang];
};
