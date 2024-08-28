import React from "react";
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
import { getUserProfile, refreshToken } from "./api/endpoints";
import { config } from "./config/config";
import BootSplash from "react-native-bootsplash";

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
        const unsubscribe = NetInfo.addEventListener((state) => {
            const isNowOnline = state.isConnected; //(state.isConnected && state.isInternetReachable);
            //const isNowOnline = true;

            if (!isCurrentOnline && isNowOnline && token) {
                refreshToken().catch(() => { }).then(getUserProfile);
            }
            if (isNowOnline !== isCurrentOnline)
                console.log('[NetInfo State Change]', isCurrentOnline, isNowOnline);
            dispatch(setOnlineStatus(isNowOnline));
        });

        return () => {
            unsubscribe();
        };
    }, [isCurrentOnline, dispatch]);

    return null;
};


export const App = () => {
    // React.useEffect(() => { persistor.purge(); }, []);
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