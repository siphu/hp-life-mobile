import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';
import {GlobalStyles} from '~/config/styles';
import {AuthToken} from '~/api/model';

export function urlWithLocale(url: string, language?: string): string {
  const locale = language;
  const urlParser = new URL(url);
  const finalUrl = `${urlParser.protocol}//${urlParser.host}/${locale}${urlParser.pathname}`;
  return finalUrl;
}

export const openBrowser = async (
  url: string,
  returnUrl: string = 'hplife://authentication/login',
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.openAuth(url, returnUrl, {
        // iOS Properties
        dismissButtonStyle: 'done',
        preferredBarTintColor: GlobalStyles.header.backgroundColor,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'automatic',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        ephemeralWebSession: false, //incognito mode
        // Android Properties
        showTitle: false,
        toolbarColor: GlobalStyles.header.backgroundColor,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: true,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_bottom',
          startExit: 'slide_out_bottom',
          endEnter: 'slide_in_bottom',
          endExit: 'slide_out_bottom',
        },
      })
        .then(async response => {
          if (response.type === 'success') {
            resolve(response.url);
          } else {
            InAppBrowser.closeAuth();
            reject(response);
          }
        })
        .catch(e => {
          InAppBrowser.closeAuth();
          reject(e);
        });
    } else {
      Linking.openURL(url);
    }
  });
};

export const extractToken = (path?: string): AuthToken => {
  if (path) {
    const url = new URL(path);
    const access_token = url.searchParams.get('token');
    const refresh_token = url.searchParams.get('refresh_token');
    if (access_token && refresh_token) {
      return {
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: Number.parseInt(url.searchParams.get('expires_in') || '0'),
        token_type: url.searchParams.get('token_type') ?? 'bearer',
      };
    }
  }
  throw new Error('Invalid Authentication URL');
};
