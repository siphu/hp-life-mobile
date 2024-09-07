jest.mock('react-native-webview', () => {
  const WebView = ({children}) => children;
  return WebView;
});
