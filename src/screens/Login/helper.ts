import {URL} from 'react-native-url-polyfill';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';

export function urlWithLocale(url: string, language?: string): string {
  const locale = language || 'en';
  const urlParser = new URL(url);
  const finalUrl = `${urlParser.protocol}//${urlParser.host}/${locale}${urlParser.pathname}`;
  return finalUrl;
}

export const openBrowser = async (
  url: string,
  returnUrl: string = 'galilee://authentication/login',
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.openAuth(url, returnUrl, {
        // iOS Properties
        dismissButtonStyle: 'done',
        preferredBarTintColor: 'purple',
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
        toolbarColor: 'purple',
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
      }).then(async response => {
        if (response.type === 'success') {
          console.log(response);
          resolve();
        } else {
          reject();
        }
      });
    } else {
      Linking.openURL(url);
    }
  });
};
