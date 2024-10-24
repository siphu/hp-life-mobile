import React, { Component, createRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  WebView as RNWebView,
  WebViewMessageEvent,
  WebViewProps as RNWebViewProps,
  WebViewNavigation,
} from 'react-native-webview';
import webviewAutoHeightJavascript from './webviewAutoHeightJavascript';

interface WebViewProps extends RNWebViewProps {
  autoExpand?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface WebViewState {
  webViewHeight: number;
}

class WebView extends Component<WebViewProps, WebViewState> {
  webViewRef = createRef<RNWebView>();
  static defaultProps: Partial<WebViewProps> = {
    autoExpand: false,
  };

  constructor(props: WebViewProps) {
    super(props);
    this.state = {
      webViewHeight: 0,
    };
  }

  onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.type === 'webviewAutoHeightAdjustment') {
        const newHeight = Number(messageData.payload);
        if (!isNaN(newHeight) && newHeight !== this.state.webViewHeight) {
          this.setState({ webViewHeight: newHeight });
        }
      }
    } catch (e) {
      console.log('[onWebViewMessage]', e);
    } finally {
      if (this.props.onMessage) {
        this.props.onMessage(event);
      }
    }
  };

  onNavigationStateChange = (navState: WebViewNavigation) => {
    if (this.props.autoExpand && this.webViewRef.current) {
      this.webViewRef.current.injectJavaScript(webviewAutoHeightJavascript);
    }

    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(navState);
    }
  };

  // Expose injectJavaScript via a public method
  injectJavaScript = (script: string) => {
    if (this.webViewRef.current) {
      this.webViewRef.current.injectJavaScript(script);
    }
  };

  render() {
    const {
      autoExpand,
      style,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onMessage,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onNavigationStateChange,
      ...webViewProps
    } = this.props;
    const { webViewHeight } = this.state;
    const autoExpandJavaScript = autoExpand ? webviewAutoHeightJavascript : '';
    const combinedJavaScript = `${autoExpandJavaScript}\n${webViewProps.injectedJavaScript || ''}`;

    return (
      <RNWebView
        ref={this.webViewRef}
        injectedJavaScript={combinedJavaScript}
        onMessage={this.onWebViewMessage}
        style={[autoExpand ? { height: webViewHeight } : {}, style]}
        javaScriptEnabled={true}
        scrollEnabled={!autoExpand}
        onNavigationStateChange={this.onNavigationStateChange}
        {...webViewProps}
      />
    );
  }
}

export default WebView;
