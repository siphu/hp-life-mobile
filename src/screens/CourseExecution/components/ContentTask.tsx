import { TaskDetail } from "~/api/endpoints";
import WebView from "~/components/Webview";
import { config } from "~/config/config";
import { contentParser } from "../helper";
import Loader from "~/components/Loader";
import React from "react";
import { disableBaseUrlLink } from "~/utils/WebViewJavascript";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "~/config/styles";
import Orientation, { OrientationType } from "react-native-orientation-locker";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { RootState } from "~/stores";


const mapStateToProps = (state: RootState, ownProps: { taskDetail: TaskDetail }) => {
    return {
        ...ownProps,
        orientation: state.app.orientation
    }
};
export const ContentTask = connect(mapStateToProps)(({ taskDetail, orientation }: { taskDetail: TaskDetail, orientation: 'Portrait' | 'Landscape' }) => {
    const webViewRef = React.useRef<WebView>(null);

    return (
        <SafeAreaView edges={orientation === 'Landscape' ? ['left', 'right'] : ['bottom']} style={GlobalStyles.screenContainer}>
            <WebView
                ref={webViewRef}
                style={{ flexGrow: 1, backgroundColor: config.color.neutral[50] }}
                scalesPageToFit={true}
                mediaPlaybackRequiresUserAction={false}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                scrollEnabled={true}
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
                domStorageEnabled={true}
                startInLoadingState
                cacheEnabled={false}
                bounces={false}
                key={taskDetail.body}
                source={contentParser(taskDetail.body!)}
                renderLoading={() => (<Loader visible={true} />)}
                onMessage={(e) => {
                    try {
                        const data = JSON.parse(e.nativeEvent.data);
                        console.log('Received data:', data);
                    } catch (error) {
                        console.error('Error parsing message data:', error);
                    }
                }}
                onLoadEnd={() => {
                    if (webViewRef.current) {
                        webViewRef.current.injectJavaScript(disableBaseUrlLink);
                    }
                }}
            /></SafeAreaView>);
});

