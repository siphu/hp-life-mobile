import {HTMLWrapper} from '~/utils';

export const contentParser = (body: string) => {
  const iFrameReg = /<iframe\s?.*?src=["'](.*?)["']/ims;
  const lessonResponsiveReg =
    /class\s?=\s?["'“”][^["'“”]*?lesson-responsive/gims;
  const mobileReg = /<div.*?mobile\s*=\s*["'](.*?)["']/gims;
  let mobileFlags: Array<string> = [];

  let m: any;
  let uri: string | undefined;
  let bypass = false;
  let rebounce: number | undefined;

  /* get all the mobile flags if exists */
  if ((m = mobileReg.exec(body)) !== null) {
    const group = m[1] as string;
    mobileFlags = group.toLowerCase().trim().split(' ');
  }

  /* see if iframe exists */
  if ((m = iFrameReg.exec(body)) !== null) {
    uri = m[1];
    if (uri) {
      /* add devicepreview=1 */
      const UrlObject = new URL(uri);
      UrlObject.searchParams.set('devicepreview', '1');
      uri = UrlObject + '';

      /* check if class has lesson-responsive */
      if (
        lessonResponsiveReg.exec(body) !== null ||
        mobileFlags.indexOf('full') !== undefined
      ) {
        bypass = true;
      }
    }
  }

  const source = uri
    ? {uri: uri}
    : {
        baseUrl: '',
        html: HTMLWrapper(body),
      };

  return source;
};
