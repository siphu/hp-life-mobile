import {stores} from '~/stores';
import {setLoader} from '~/stores/app/actions';

export const loaderWrapper = async (fn: () => Promise<any>) => {
  stores.dispatch(setLoader(true));
  await fn();
  stores.dispatch(setLoader(false));
};
