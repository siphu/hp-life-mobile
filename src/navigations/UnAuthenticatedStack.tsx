import React from 'react';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { config } from '~/config/config';
import { UnAuthenticatedScreens } from './screens';
import Login from '~/screens/Login';
import { HeaderBackIcon } from './components/HeaderBackIcon';
import { HeaderMenuIcon } from './components/HeaderMenuIcon';
import { HeaderLogo } from './components/HeaderLogo';
import { GlobalStyles } from '~/config/styles';
import { useNavigation } from '@react-navigation/native';
import { HeaderLanguageIcon } from './components/HeaderLanguageIcon';
import LanguageSelector from '~/components/LanguageSelector';
import { View } from 'react-native';

const Screen = createStackNavigator();

/**
 * Screen entry point for Un-Authenticated Users. Default to Login
 * @returns
 */
export const UnAuthenticatedStack = () => {

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const screenOptions: StackNavigationOptions = {
        headerShown: true,
        headerStyle: {
            height: GlobalStyles.header.height + insets.top,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: GlobalStyles.header.backgroundColor,
        headerTitle: '',
        headerBackground: () => <HeaderLogo />,
        gestureEnabled: false,
    };

    return (
        <Screen.Navigator screenOptions={screenOptions} initialRouteName={UnAuthenticatedScreens.Login}>
            <Screen.Group>
                <Screen.Screen
                    name={UnAuthenticatedScreens.Login}
                    component={Login}
                    options={{
                        headerLeft: () => <HeaderLanguageIcon />,
                    }}
                />
            </Screen.Group>
            <Screen.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
                <Screen.Screen
                    name={UnAuthenticatedScreens.Language}
                    component={LanguageSelector} />
            </Screen.Group>
        </Screen.Navigator>
    );
};
