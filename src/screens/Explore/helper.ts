import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {Course} from '~/api/model';
import {getAvailableCourses as getRemoteAvailableCourses} from '~/api/rest/courses';
import {stores} from '~/stores';
import {StoreAppState} from '~/stores/app/state';
import {
  setAvailableCourses,
  updateAvailableCourses,
} from '~/stores/course/actions';
import {StoreCourseState} from '~/stores/course/state';

export const getAvailableCourses = async (
  force?: boolean,
): Promise<Course[]> => {
  const appState: StoreAppState = stores.getState().app!;
  const language = appState.language || 'en';
  if (force) {
    await stores.dispatch(setAvailableCourses(language, []));
  }
  let page = 0;
  let finished = false;
  do {
    const result = await getRemoteAvailableCourses(
      undefined,
      undefined,
      appState.language,
      page,
    );
    await stores.dispatch(updateAvailableCourses(language, result.results));
    ++page;
    finished = page >= result.pagesCount - 1;
  } while (!finished);

  return (stores.getState().course! as StoreCourseState).available![language];
};
