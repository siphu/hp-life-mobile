/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-url-polyfill/auto';
import {App} from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "EventEmitter.removeListener('url', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
  'Require cycle:',
  'VirtualizedList:',
  "Usage of \"messaging().registerDeviceForRemoteMessages()\" is not required. You only need to register if auto-registration is disabled in your 'firebase.json' configuration file via the 'messaging_ios_auto_register_for_remote_messages' property.",
]);
