/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import moment from 'moment';
export interface RequestError extends Error {
  status: number | undefined;
  message: string;
  error_description?: string;
}
/**
 * Intercept the response from axios (non-intercept) to handle high-level error and cast the result over the the defined type or interface
 * @param response AxiosResponse
 */
export const processResponse = async function <R>(
  response: Promise<AxiosResponse<any>>,
): Promise<R> {
  const timerStart = moment();

  return response
    .then(result => {
      const timerEnd = moment();

      console.log(
        `[${timerStart.toLocaleString()}]`,
        `[${('000' + timerEnd.diff(timerStart)).slice(-5)}ms]`,
        `[${result.status}]`,
        `[${result.config.method?.toUpperCase()}]`,
        result.config.url,
      );

      switch (result.status) {
        case 200:
        case 201:
          return Promise.resolve(result.data as R);
        case 204:
          return Promise.resolve({} as unknown as R);
        default:
          console.log('error rejection other', result);
          return Promise.reject({
            ...result,
            message: result.data,
            error_message: `Error ${result.status} from API Server`,
          } as unknown as RequestError);
      }
    })
    .catch(result => {
      const timerEnd = moment();
      if (Object.prototype.hasOwnProperty.call(result, 'config'))
        console.error(
          `[${timerStart.toLocaleString()}]`,
          `[${('000' + timerEnd.diff(timerStart)).slice(-5)}ms]`,
          `[${result.response?.status}]`,
          `[${result.config.method?.toUpperCase()}]`,
          result.config.url,
        );
      else if (Object.prototype.hasOwnProperty.call(result, 'data')) {
        console.error(
          `[${timerStart.toLocaleString()}]`,
          `[${('000' + timerEnd.diff(timerStart)).slice(-5)}ms]`,
          `[${result.response?.status}]`,
          `[${result.method?.toUpperCase()}]`,
          result.url,
        );
      }

      return Promise.reject({
        ...result.response,
        message: result?.response?.data || '',
        error_message: `Error ${result.response?.status} from API Server`,
      } as unknown as RequestError);
    });
};

export async function get<T>(
  url: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  return processResponse<T>(axios.get(url, { params: payload }));
}
export async function post<T>(
  url: string,
  payload?: Record<string, unknown> | any,
  formUrlEncoded = false,
  headers?: Record<string, string>,
): Promise<T> {
  let configHeader = headers || {};
  if (formUrlEncoded)
    configHeader = {
      ...configHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  return processResponse<T>(
    axios.post(url, payload, { headers: configHeader as AxiosHeaders }),
  );
}
export async function patch<T>(
  url: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  return processResponse<T>(axios.patch(url, payload));
}
export async function put<T>(
  url: string,
  payload?: Record<string, unknown> | any,
): Promise<T> {
  return processResponse<T>(axios.put(url, payload));
}
export async function remove<T>(url: string): Promise<T> {
  return processResponse<T>(axios.delete(url));
}

export async function postBody<T>(
  url: string,
  payload?: Record<string, unknown> | any,
): Promise<T> {
  return processResponse<T>(
    axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}
