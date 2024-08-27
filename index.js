/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-url-polyfill/auto';
import 'intl-pluralrules';
import {App} from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "Usage of \"messaging().registerDeviceForRemoteMessages()\" is not required. You only need to register if auto-registration is disabled in your 'firebase.json' configuration file via the 'messaging_ios_auto_register_for_remote_messages' property.",
]);

AppRegistry.registerComponent(appName, () => App);
