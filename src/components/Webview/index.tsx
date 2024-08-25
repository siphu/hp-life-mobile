import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView as RNWebView, WebViewMessageEvent, WebViewProps as RNWebViewProps, WebViewNavigation } from 'react-native-webview';

interface WebViewProps extends RNWebViewProps {
    autoExpand?: boolean;
    style?: StyleProp<ViewStyle>;
}

interface WebViewState {
    webViewHeight: number;
}

class WebView extends Component<WebViewProps, WebViewState> {
    private webViewRef = React.createRef<RNWebView>();
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

            if (messageData.type === 'auto_height_adjustment') {
                const newHeight = Number(messageData.value);
                if (!isNaN(newHeight) && newHeight !== this.state.webViewHeight) {
                    this.setState({ webViewHeight: newHeight });
                }
            } else if (this.props.onMessage) {
                // Call the caller's onMessage handler for other message types
                this.props.onMessage(event);
            }
        } catch (error) {
            // If JSON parsing fails, pass the event to the caller's onMessage handler
            if (this.props.onMessage) {
                this.props.onMessage(event);
            }
        }
    };

    onNavigationStateChange = (navState: WebViewNavigation) => {
        // Re-inject only the autoExpand JavaScript when the page changes
        if (this.props.autoExpand && this.webViewRef.current) {
            this.webViewRef.current.injectJavaScript(this.getAutoExpandJavaScript());
        }

        // Call the caller's onNavigationStateChange handler if provided
        if (this.props.onNavigationStateChange) {
            this.props.onNavigationStateChange(navState);
        }
    };

    getAutoExpandJavaScript = () => {
        return `
      if (typeof window._webview_auto_height_adjustment === 'undefined') {
        window._webview_auto_height_adjustment = true;
        setTimeout(function() {
          let lastHeight = 0;
          let timeoutId;

          const updateHeight = function() {
            const height = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (height !== lastHeight) {
              lastHeight = height;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'auto_height_adjustment', value: height }));
            }
          };

          const debouncedUpdateHeight = function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateHeight, 100);
          };

          const observer = new MutationObserver(debouncedUpdateHeight);
          observer.observe(document.body, { childList: true, subtree: true, attributes: true });

          // Initial height calculation
          updateHeight();
        }, 0);
      }
    `;
    };

    render() {
        const { autoExpand, style, onMessage, onNavigationStateChange, ...webViewProps } = this.props;
        const { webViewHeight } = this.state;

        const autoExpandJavaScript = autoExpand ? this.getAutoExpandJavaScript() : '';

        const combinedJavaScript = `${autoExpandJavaScript}\n${webViewProps.injectedJavaScript || ''}`;

        return (
            <RNWebView
                ref={this.webViewRef}
                injectedJavaScript={combinedJavaScript}
                onMessage={this.onWebViewMessage}
                style={[
                    autoExpand ? { height: webViewHeight } : {},
                    style,
                ]}
                javaScriptEnabled={true}
                scrollEnabled={!autoExpand}
                onNavigationStateChange={this.onNavigationStateChange}
                {...webViewProps}
            />
        );
    }
}

export default WebView;
