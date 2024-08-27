import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyles } from '~/config/styles';
import { AuthenticatedScreens } from '../screens';
import Home from '~/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderLogo } from '../components/HeaderLogo';
import Dashboard from '~/screens/Dashboard';
import Explore from '~/screens/Explore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { config } from '~/config/config';
import { HeaderMenuIcon } from '../components/HeaderMenuIcon';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerContentWrapper } from '../components/DrawerContentWrapper';
import { View } from 'react-native';
import Text from '~/components/Text';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '~/stores';
import { getRemoteMessages } from '~/api/helper';
import { t } from '~/providers/TranslationProvider';
import AlertBanner from '~/components/AlertBanner';
import OfflineBanner from '~/components/OfflineBanner';

const HomeDrawerNavigation = createDrawerNavigator();
const HomeBottomTabs = createBottomTabNavigator();

const connector = connect((state: RootState) => ({
    alert: state.user.alert,
    language: state.app.language,
    offline: state.app.online === false
}));

/**
 * Screens access via the Drawer Navigation (Side Menu)
 * @returns
 */
export const BottomTabs: React.FC<ConnectedProps<typeof connector>> = ({ alert, offline }) => {

    return (
        <HomeBottomTabs.Navigator
            initialRouteName={AuthenticatedScreens.Home}
            screenListeners={{
                state: (e) => {
                    const state = e.data.state;
                    const currentRoute = state.routes[state.index]?.name;
                    switch (currentRoute) {
                        case AuthenticatedScreens.Home:
                        case AuthenticatedScreens.Dashboard:
                        case AuthenticatedScreens.Explore:
                            getRemoteMessages();
                        default:
                            break;
                    }
                }
            }}
            screenOptions={({ route }) => ({
                gestureDirection: 'horizontal-inverted',
                headerShown: offline,
                header: () => offline && <OfflineBanner />,
                headerTitle: '',
                tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                        case AuthenticatedScreens.Home: return <MaterialCommunityIcons name="home-outline" size={size} color={focused ? config.color.blue.primary : color} />
                        case AuthenticatedScreens.Dashboard: return <MaterialCommunityIcons name="school-outline" size={size} color={focused ? config.color.blue.primary : color} />
                        case AuthenticatedScreens.Explore: return <MaterialIcons name="search" size={24} color={focused ? config.color.blue.primary : color} />
                        default: return null;
                    }
                }
            })}>
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Home}
                component={Home}
                options={({ route }) => ({
                    tabBarLabel: t('menu.home'),
                })}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Dashboard}
                component={Dashboard}
                options={({ route }) => ({
                    tabBarLabel: t('menu.myCourse'),
                })}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Explore}
                component={Explore}
                options={({ route }) => ({
                    tabBarLabel: t('menu.explore'),
                })}
            />
        </HomeBottomTabs.Navigator >);
}
const ConnectedBottomTabs = connector(BottomTabs);

export const HomeDrawer = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    return (
        <HomeDrawerNavigation.Navigator
            initialRouteName={AuthenticatedScreens.HomeTabs}
            drawerContent={DrawerContentWrapper}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    height: GlobalStyles.header.height + insets.top,
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: GlobalStyles.header.backgroundColor,
                },
                headerLeft: () => <HeaderMenuIcon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
                headerBackground: () => <HeaderLogo />,
                headerTitle: '',
                drawerType: 'front',
                drawerStyle: {
                    width: '100%'
                },
            }}>
            <HomeDrawerNavigation.Screen
                name={AuthenticatedScreens.HomeTabs}
                component={ConnectedBottomTabs}
            />
        </HomeDrawerNavigation.Navigator>
    );
}