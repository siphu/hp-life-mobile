import axios from 'axios';
import {stores} from '../stores';
import {config as appConfig, config} from '~/config/config';
import qs from 'qs';

axios.interceptors.request.use(function (request) {
  //@ts-ignore
  const token = stores.getState().user?.token?.access_token;

  /* fix data when content-type is x-www-form-urlencoded */
  if (
    request.data &&
    typeof request.data === 'object' &&
    request.headers &&
    request.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    request.data = qs.stringify(request.data);
  }

  /* need to send we need to add the authorization */
  if (
    (request.url
      ?.toLocaleLowerCase()
      .startsWith(config.api.learning.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.identity.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.marketing.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.push.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.rewards.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.analytics.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.book.toLocaleLowerCase()) ||
      request.url
        ?.toLocaleLowerCase()
        .startsWith(config.api.alert.toLocaleLowerCase())) &&
    token &&
    request.headers &&
    !request.headers.Authorization
  ) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
