import React from "react";
import { LogBox } from 'react-native';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationStacks } from "./navigation";
import { OrientationLocker } from 'react-native-orientation-locker';
import { Provider } from "react-redux";
import { stores, persistor } from './stores';
import { PersistGate } from "redux-persist/integration/react";
import './translations';
import '~/api/client/interceptor';
import TranslationProvider from "./providers/TranslationProvider";
import BootSplash from "react-native-bootsplash";
import NetworkListener from "./listeners/NetworkListener";
import { OrientationListener } from "./listeners/OrientationListener";

export const App = () => {
    return (
        <SafeAreaProvider>
            <Provider store={stores}>
                <PersistGate loading={null} persistor={persistor}>
                    <NetworkListener />
                    <OrientationListener />
                    <TranslationProvider>
                        <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
                            <OrientationLocker orientation="PORTRAIT" />
                            <StatusBar
                                animated={true}
                                barStyle={'dark-content'}
                                backgroundColor={'transparent'}
                                translucent={true}
                                hidden={false}
                            />
                            <NavigationStacks />
                        </NavigationContainer>
                    </TranslationProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}




LogBox.ignoreLogs([
    "Usage of \"messaging().registerDeviceForRemoteMessages()\" is not required. You only need to register if auto-registration is disabled in your 'firebase.json' configuration file via the 'messaging_ios_auto_register_for_remote_messages' property.",
]);
LogBox.ignoreAllLogs();
