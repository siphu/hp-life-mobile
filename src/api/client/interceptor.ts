import axios from 'axios';
import { stores } from '~/stores';
import { config } from '~/config/config';
import qs from 'qs';
import { isValidUrl } from '~/utils';
import DeviceInfo from 'react-native-device-info';

const userAgent = `${DeviceInfo.getApplicationName()}/${DeviceInfo.getVersion()} (Build ${DeviceInfo.getBuildNumber()}; ${DeviceInfo.getBrand()}; ${DeviceInfo.getModel()}; ${DeviceInfo.getSystemName()} ${DeviceInfo.getBaseOsSync()}; ${__DEV__ ? 'Development' : 'Production'})`;

axios.interceptors.request.use(function (request) {
  const token = stores.getState().user.token?.access_token;

  if (
    request.data &&
    typeof request.data === 'object' &&
    request.headers &&
    request.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    request.data = qs.stringify(request.data);
  }

  const apiUrls = Object.values(config.api)
    .filter(value => typeof value === 'string' && isValidUrl(value))
    .map(url => (url as string).toLocaleLowerCase().trim());

  if (
    apiUrls.some(apiUrl =>
      request.url?.toLocaleLowerCase().startsWith(apiUrl),
    ) &&
    token &&
    !request.headers.Authorization
  ) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  if (request.headers) {
    request.headers['User-Agent'] = userAgent;
  }

  return request;
});
