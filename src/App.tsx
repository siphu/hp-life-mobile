import React from "react";
import { LogBox } from 'react-native';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationStacks } from "./navigation";
import { OrientationLocker } from 'react-native-orientation-locker';
import { Provider, useDispatch, useSelector } from "react-redux";
import { stores, persistor, RootState } from './stores';
import { PersistGate } from "redux-persist/integration/react";
import './translations';
import '~/api/client/interceptor';
import TranslationProvider from "./providers/TranslationProvider";
import NetInfo from '@react-native-community/netinfo';
import { setOnlineStatus } from "./stores/app/actions";
import { config } from "./config/config";
import BootSplash from "react-native-bootsplash";
import { getPushNotifications, getUserProfile, refreshToken } from "./api/helpers";
import _ from "lodash";

NetInfo.configure({
    reachabilityUrl: config.api.learning,
    reachabilityTest: async (response) => response.status >= 200 && response.status < 500,
    reachabilityLongTimeout: 60 * 1000,
    reachabilityShortTimeout: 5 * 1000,
    reachabilityRequestTimeout: 15 * 1000,
    reachabilityShouldRun: () => true
});


const NetworkListener = () => {
    const isCurrentOnline = useSelector((state: RootState) => state.app.online);
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch();


    React.useEffect(() => {
        const debouncedListener = _.debounce((state) => {
            const isNowOnline = state.isConnected; //(state.isConnected && state.isInternetReachable);
            if (isCurrentOnline !== isNowOnline) {
                dispatch(setOnlineStatus(isNowOnline));
                console.log('[NetInfo State Change]', isCurrentOnline, isNowOnline);
            }
            if (!isCurrentOnline && isNowOnline && token) {
                refreshToken().catch(() => { }).then(getUserProfile).then(getPushNotifications);
            }
        }, 100);
        const unsubscribe = NetInfo.addEventListener(debouncedListener);

        return () => {
            unsubscribe();
        };
    }, [isCurrentOnline, dispatch, token]);

    return null;
};


export const App = () => {

    //React.useEffect(() => { persistor.purge(); }, []);

    return (
        <SafeAreaProvider>
            <Provider store={stores}>
                <PersistGate loading={null} persistor={persistor}>
                    <NetworkListener />
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
