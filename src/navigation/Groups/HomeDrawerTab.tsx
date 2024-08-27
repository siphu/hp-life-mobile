import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyles } from '~/config/styles';
import { AuthenticatedScreens } from '../screens';
import Home from '~/screens/Home';
import { BottomTabBarButtonProps, BottomTabNavigationEventMap, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderLogo } from '../components/HeaderLogo';
import Dashboard from '~/screens/Dashboard';
import Explore from '~/screens/Explore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from "~/components/MaterialIcons";
import { config } from '~/config/config';
import { HeaderMenuIcon } from '../components/HeaderMenuIcon';
import { DrawerActions, EventArg, ParamListBase, RouteProp, TabNavigationState, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerContentWrapper } from '../components/DrawerContentWrapper';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '~/stores';
import { getRemoteMessages } from '~/api/helper';
import { t } from '~/providers/TranslationProvider';
import OfflineBanner from '~/components/OfflineBanner';
import RemoteAlertBanner from '~/components/RemoteAlertBanner';
import { TouchableOpacity } from 'react-native';

const HomeDrawerNavigation = createDrawerNavigator();
const HomeBottomTabs = createBottomTabNavigator();

const AllowedOfflineScreens = [AuthenticatedScreens.Dashboard];

const connector = connect((state: RootState) => ({
    alerts: state.user.alerts,
    language: state.app.language,
    offline: state.app.online === false
}));

/**
 * Screens access via the Drawer Navigation (Side Menu)
 * @returns
 */
export const BottomTabs: React.FC<ConnectedProps<typeof connector>> = ({ alerts, offline }) => {

    const navigation = useNavigation();
    const route = useRoute();

    React.useEffect(() => {
        if (offline && !AllowedOfflineScreens.includes(route.name as AuthenticatedScreens)) {
            navigation.navigate(AuthenticatedScreens.Dashboard, { tab: 'offline' });
        }
    }, [offline, route.name, navigation]);

    const screenListeners = React.useMemo(() => ({
        state: (e: EventArg<"state", undefined, {
            state: TabNavigationState<ParamListBase>;
        }>) => {
            const state = e.data.state;
            const currentRoute = state.routes[state.index]?.name as AuthenticatedScreens;
            if ([AuthenticatedScreens.Home, AuthenticatedScreens.Dashboard, AuthenticatedScreens.Explore].includes(currentRoute)) {
                getRemoteMessages();
            }
        },
    }), []);

    const screenOptions = React.useCallback(({ route }: { route: RouteProp<ParamListBase, string> }) => ({
        gestureDirection: 'horizontal-inverted',
        headerShown: Boolean((alerts && alerts.length > 0) || offline),
        header: () => (alerts?.length > 0 ? <RemoteAlertBanner alerts={alerts} /> : offline ? <OfflineBanner /> : null),
        headerTitle: '',
        tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity
                disabled={offline && route.name !== AuthenticatedScreens.Dashboard}
                {...props}
                onPress={(e) => {
                    if (!offline && props.onPress) {
                        props.onPress(e);
                    }
                }}
            >
                {props.children}
            </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }: {
            focused: boolean;
            color: string;
            size: number;
        }) => {
            const iconColor = focused ? config.color.blue.primary : color;
            switch (route.name) {
                case AuthenticatedScreens.Home:
                    return <MaterialCommunityIcons name="home-outline" size={size} color={iconColor} />;
                case AuthenticatedScreens.Dashboard:
                    return <MaterialCommunityIcons name="school-outline" size={size} color={iconColor} />;
                case AuthenticatedScreens.Explore:
                    return <MaterialIcons name="search" size={24} color={iconColor} />;
                default:
                    return null;
            }
        },
    }), [alerts, offline]);

    return (
        <HomeBottomTabs.Navigator
            initialRouteName={AuthenticatedScreens.Home}
            screenListeners={screenListeners}
            screenOptions={screenOptions}
        >
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Home}
                component={Home}
                options={{ tabBarLabel: t('menu.home') }}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Dashboard}
                component={Dashboard}
                options={{ tabBarLabel: t('menu.myCourse') }}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Explore}
                component={Explore}
                options={{ tabBarLabel: t('menu.explore') }}
            />
        </HomeBottomTabs.Navigator>
    );
};


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