import {TaskDetail} from '~/api/endpoints';
import WebView from '~/components/Webview';
import {config} from '~/config/config';
import Loader from '~/components/Loader';
import React from 'react';
import {disableBaseUrlLink} from '~/utils/WebViewJavascript';
import {Dimensions} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {GlobalStyles} from '~/config/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {RootState} from '~/stores';

const mapStateToProps = (
  state: RootState,
  ownProps: {taskDetail: TaskDetail},
) => {
  return {
    ...ownProps,
    orientation: state.app.orientation,
  };
};
export const SurveyTask = connect(mapStateToProps)(({
  taskDetail,
  orientation,
}: {
  taskDetail: TaskDetail;
  orientation: 'Portrait' | 'Landscape';
}) => {
  const webViewRef = React.useRef<WebView>(null);

  return (
    <SafeAreaView
      edges={orientation === 'Landscape' ? ['left', 'right'] : ['bottom']}
      style={GlobalStyles.screenContainer}>
      <WebView
        ref={webViewRef}
        style={{flexGrow: 1, backgroundColor: config.color.neutral[50]}}
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
        source={{html: 'This is a survey course. TODO'}}
        renderLoading={() => <Loader visible={true} />}
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
        }}
      />
    </SafeAreaView>
  );
});
