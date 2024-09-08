import axios from 'axios';
import { stores } from '~/stores';
import { config as appConfig, config } from '~/config/config';
import qs from 'qs';
import { isValidUrl } from '~/utils';

axios.interceptors.request.use(function (request) {
  //@ts-ignore
  const token = stores.getState().user?.token?.access_token;

  if (
    request.data &&
    typeof request.data === 'object' &&
    request.headers &&
    request.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    request.data = qs.stringify(request.data);
  }

  /* need to send we need to add the authorization */
  const apiUrls = Object.values(config.api)
    .filter(value => typeof value === 'string' && isValidUrl(value))
    .map(url => (url as string).toLocaleLowerCase().trim());

  if (
    apiUrls.some(apiUrl =>
      request.url?.toLocaleLowerCase().startsWith(apiUrl),
    ) &&
    token &&
    request.headers &&
    !request.headers.Authorization
  ) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
