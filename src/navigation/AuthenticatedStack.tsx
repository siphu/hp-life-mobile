import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { AuthenticatedScreens } from './screens';
import { HomeDrawer } from './Groups/HomeDrawerTab';
import CourseInformation from '~/screens/CourseInformation';
import Profile from '~/screens/Profile';
import { HeaderBackIcon } from './components/HeaderBackIcon';
import { GlobalStyles } from '~/config/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InAppBrowser from '~/screens/InAppBrowser';

const Screen = createStackNavigator();

export const AuthenticatedStack = () => {

    const insets = useSafeAreaInsets();
    return (
        <Screen.Navigator
            initialRouteName={AuthenticatedScreens.HomeDrawer}
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    height: GlobalStyles.header.height + insets.top,
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: GlobalStyles.header.backgroundColor,
                },
                headerBackTitleVisible: false,
                title: '',
            }}
        >
            <Screen.Screen
                name={AuthenticatedScreens.HomeDrawer}
                component={HomeDrawer}
            />
            <Screen.Screen
                name={AuthenticatedScreens.Profile}
                component={Profile}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
                })}
            />
            <Screen.Screen
                name={AuthenticatedScreens.InAppBrowser}
                component={InAppBrowser}
                options={({ navigation, route }) => ({
                    headerShown: true,
                    headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
                    //@ts-ignore
                    title: route.params?.title || '',
                })}
            />
            <Screen.Screen
                name={AuthenticatedScreens.CourseInformation}
                component={CourseInformation}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />
                })}
            />
        </Screen.Navigator>
    );
};
