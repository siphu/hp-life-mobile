import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler, Linking, Platform, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { URL } from 'react-native-url-polyfill';
import { styles } from './styles'
import { config } from '~/config/config';
import { HeaderBackIcon } from '~/navigation/components/HeaderBackIcon';
import { AuthenticatedScreens } from '~/navigation/screens';
import { RootStackParamList } from '~/navigation';

function urlWithLocale(url: string, locale: string): string {
    const urlParser = new URL(url);
    const finalUrl = `${urlParser.protocol}//${urlParser.host}/${locale}${urlParser.pathname}`;
    return finalUrl;
}

const InAppBrowser = ({ navigation }: RootStackParamList) => {
    const [canGoBack, setCanGoBack] = React.useState<boolean>(false);
    const route = useRoute();
    const webViewRef = React.useRef<WebView>(null);
    // @ts-ignore
    const { title, locale } = route.params;
    // @ts-ignore
    const url = locale ? urlWithLocale(route.params?.url, locale) : route.params?.url;

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
            headerLeft: () => <HeaderBackIcon onPress={() => {
                if (canGoBack)
                    webViewRef.current?.injectJavaScript(`history.back();`);
                else navigation.goBack();
            }} />,
        })
    }, []);

    return (
        <View style={styles.fullFlex}>
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                style={styles.grow}
                javaScriptEnabled={true}
                originWhitelist={['*']}
                setSupportMultipleWindows={false}
                allowsFullscreenVideo={true}
                onLoadProgress={e => {
                    if (Platform.OS === 'android' && e.nativeEvent.progress >= 1) {
                        setCanGoBack(e.nativeEvent.canGoBack);
                    }
                }}
                onShouldStartLoadWithRequest={e => {

                    if (e.url.toLocaleLowerCase().startsWith(config.api.webUrl.toLocaleLowerCase())) {
                        const UrlObject = new URL(e.url) as any;
                        const { pathname } = UrlObject;
                        const match = (/^(?:\/[^\/]+)?\/course\/(\d+)(?:-.*)?$/gm).exec(pathname.toLowerCase());
                        if (match && match?.length > 1) {
                            navigation.navigate(AuthenticatedScreens.CourseInformation, {
                                id: match[1]
                            });
                            return false;
                        }
                    }
                    else if (
                        e.url.toLocaleLowerCase().startsWith('tel:') ||
                        e.url.toLocaleLowerCase().startsWith('mailto:') ||
                        e.url.toLocaleLowerCase().startsWith('maps:') ||
                        e.url.toLocaleLowerCase().startsWith('geo:') ||
                        e.url.toLocaleLowerCase().startsWith('sms:')
                    ) {
                        Linking.openURL(e.url).catch(error => {
                            console.log('error', error);
                        });
                        return false;
                    }
                    return true;
                }}
                onNavigationStateChange={e => {
                    if (Platform.OS == 'ios') {
                        setCanGoBack(e.canGoBack);
                    }
                }}
            />
        </View>
    );
};


export default InAppBrowser;