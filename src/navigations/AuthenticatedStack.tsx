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

const Screen = createStackNavigator();

export const AuthenticatedStack = () => {
    const insets = useSafeAreaInsets();
    return (
        <Screen.Navigator
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
            initialRouteName={AuthenticatedScreens.HomeDrawer}
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
                name={AuthenticatedScreens.CourseInformation}
                component={CourseInformation}
            />
        </Screen.Navigator>
    );
};
