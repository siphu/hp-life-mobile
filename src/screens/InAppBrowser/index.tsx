import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as React from 'react';
import { BackHandler, Linking, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { URL } from 'react-native-url-polyfill';
import { styles } from './styles';
import { config } from '~/config/config';
import { HeaderBackIcon } from '~/navigation/components/HeaderBackIcon';
import { AuthenticatedScreens } from '~/navigation/screens';
import { RootStackParamList } from '~/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { isBaseUrl } from '~/utils';
import {
  appendViewport,
  disableBaseUrlLink,
  documentReady,
  getContentSize,
} from '~/utils/WebViewJavascript';
import Loader from '~/components/Loader';

function urlWithLocale(url: string, locale: string): string {
  const urlParser = new URL(url);
  const finalUrl = `${urlParser.protocol}//${urlParser.host}/${locale}${urlParser.pathname}`;
  return finalUrl;
}

const InAppBrowser = ({
  route,
}: StackScreenProps<RootStackParamList, AuthenticatedScreens.InAppBrowser>) => {
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = React.useState<boolean>(false);
  const webViewRef = React.useRef<WebView>(null);
  const { title, locale } = route.params;
  const url = locale
    ? urlWithLocale(route.params?.url!, locale)
    : route.params?.url;

  const nav = useNavigation();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack) {
          webViewRef.current?.injectJavaScript(`history.back();`);
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackIcon
          onPress={() => {
            if (canGoBack)
              webViewRef.current?.injectJavaScript(`history.back();`);
            else navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.fullFlex}>
      <WebView
        ref={webViewRef}
        key={url!}
        source={{ uri: url! }}
        scalesPageToFit={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        scrollEnabled={true}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        domStorageEnabled={true}
        startInLoadingState
        renderLoading={() => <Loader visible={true} />}
        onLoadEnd={() => {
          if (webViewRef.current) {
            webViewRef.current.injectJavaScript(disableBaseUrlLink);
          }
        }}
        onLoadProgress={e => {
          if (Platform.OS === 'android' && e.nativeEvent.progress >= 1) {
            setCanGoBack(e.nativeEvent.canGoBack);
          }
        }}
        onShouldStartLoadWithRequest={e => {
          if (isBaseUrl(config.api.webUrl, e.url)) {
            return false;
          } else if (
            e.url.toLowerCase().startsWith(config.api.webUrl.toLowerCase())
          ) {
            const UrlObject = new URL(e.url);
            const { pathname } = UrlObject;
            const match = /^(?:\/[^\/]+)?\/course\/(\d+)(?:-.*)?$/gm.exec(
              pathname.toLowerCase(),
            );
            if (match && match.length > 1) {
              navigation.navigate(AuthenticatedScreens.CourseDrawer, {
                screen: AuthenticatedScreens.CourseInformation,
                params: { courseId: parseInt(match[1], 10) },
              });
              return false;
            }
          } else if (
            ['tel:', 'mailto:', 'maps:', 'geo:', 'sms:', 'intent:'].some(
              prefix => e.url.toLowerCase().startsWith(prefix),
            )
          ) {
            Linking.openURL(e.url).catch(error => {
              console.log('Error opening URL:', error);
            });
            return false;
          }
          return true;
        }}
        onNavigationStateChange={e => {
          if (Platform.OS === 'ios') {
            setCanGoBack(e.canGoBack);
          }
        }}
      />
    </View>
  );
};

export default InAppBrowser;
