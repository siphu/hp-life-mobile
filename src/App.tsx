import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationStacks } from "./navigation";
import { OrientationLocker } from 'react-native-orientation-locker';
import { Provider } from "react-redux";
import { stores, persistor } from './stores';
import { PersistGate } from "redux-persist/integration/react";
import './translations';
import '~/api/interceptor';

export const App = () => {

    const onReady = () => {
        //RNBootSplash.hide({ fade: true });
    };

    return (
        <SafeAreaProvider>
            <Provider store={stores}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer onReady={onReady}>
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
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}

