import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import { GlobalStyles } from '~/config/styles';
import { AuthToken } from '~/api/endpoints';

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
  try {
    if (await InAppBrowser.isAvailable()) {
      const response = await InAppBrowser.openAuth(url, returnUrl, {
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
        ephemeralWebSession: false, // incognito mode
        // Android Properties
        showTitle: false,
        toolbarColor: GlobalStyles.header.backgroundColor,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: true,
        // Animations
        animations: {
          startEnter: 'slide_in_bottom',
          startExit: 'slide_out_bottom',
          endEnter: 'slide_in_bottom',
          endExit: 'slide_out_bottom',
        },
      });

      if (response.type === 'success') {
        return response.url;
      } else {
        InAppBrowser.closeAuth();
        throw new Error(`Browser auth failed: ${response.type}`);
      }
    } else {
      await Linking.openURL(url);
      InAppBrowser.closeAuth();
      throw new Error(`No built-in browser support. Opening External`);
    }
  } catch (e) {
    InAppBrowser.closeAuth();
    throw e;
  }
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
