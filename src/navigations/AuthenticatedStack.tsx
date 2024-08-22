import React from 'react';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import { AuthenticatedScreens } from './screens';
import { HomeDrawer } from './Groups/HomeDrawerTab';
import CourseInformation from '~/screens/CourseInformation';

const Screen = createStackNavigator();

/**
 * Screen entry point for Un-Authenticated Users. Default to Login
 * @returns
 */
export const AuthenticatedStack = () => {
    return (
        <Screen.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={AuthenticatedScreens.HomeDrawer}
        >
            <Screen.Screen
                name={AuthenticatedScreens.HomeDrawer}
                component={HomeDrawer}
            />
            <Screen.Screen
                name={AuthenticatedScreens.CourseInformation}
                component={CourseInformation}
            />
        </Screen.Navigator>
    );
};
