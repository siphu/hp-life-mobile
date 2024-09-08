import { TaskDetail } from '~/api/endpoints';
import WebView from '~/components/Webview';
import { config } from '~/config/config';
import { contentParser } from '../helper';
import React from 'react';
import { disableBaseUrlLink } from '~/utils/WebViewJavascript';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '~/config/styles';
import { connect } from 'react-redux';
import { RootState, stores } from '~/stores';
import { setLoader } from '~/stores/app/actions';

const mapStateToProps = (
  state: RootState,
  ownProps: { taskDetail: TaskDetail },
) => {
  return {
    ...ownProps,
    orientation: state.app.orientation,
  };
};
export const ContentTask = connect(mapStateToProps)(({
  taskDetail,
  orientation,
}: {
  taskDetail: TaskDetail;
  orientation: 'Portrait' | 'Landscape';
}) => {
  const webViewRef = React.useRef<WebView>(null);

  React.useEffect(() => {
    stores.dispatch(setLoader(true));
  }, [taskDetail]);

  return (
    <SafeAreaView
      edges={orientation === 'Landscape' ? ['left', 'right'] : ['bottom']}
      style={GlobalStyles.screenContainer}>
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
        onMessage={e => {
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
          stores.dispatch(setLoader(false));
        }}
      />
    </SafeAreaView>
  );
});
