import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyles } from '~/config/styles';
import { AuthenticatedScreens } from '../screens';
import Home from '~/screens/Home';
import SideMenuDrawer from '~/components/SideMenuDrawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderLogo } from '../components/HeaderLogo';
import Dashboard from '~/screens/Dashboard';
import Explore from '~/screens/Explore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { config } from '~/config/config';
import { HeaderMenuIcon } from '../components/HeaderMenuIcon';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { DrawerContentWrapper } from '../components/DrawerContentWrapper';

const HomeDrawerNavigation = createDrawerNavigator();
const HomeBottomTabs = createBottomTabNavigator();




/**
 * Screens access via the Drawer Navigation (Side Menu)
 * @returns
 */

export const BottomTabs = () => {
    return (
        <HomeBottomTabs.Navigator
            screenOptions={({ route }) => ({
                gestureDirection: 'horizontal-inverted',
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                        case AuthenticatedScreens.Home: return <MaterialCommunityIcons name="home-outline" size={24} color={focused ? config.color.blue.primary : color} />
                        case AuthenticatedScreens.Dashboard: return <MaterialCommunityIcons name="school-outline" size={24} color={focused ? config.color.blue.primary : color} />
                        case AuthenticatedScreens.Explore: return <MaterialIcons name="search" size={24} color={focused ? config.color.blue.primary : color} />
                        default: return null;
                    }
                }
            })}>
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Home}
                component={Home}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Dashboard}
                component={Dashboard}
            />
            <HomeBottomTabs.Screen
                name={AuthenticatedScreens.Explore}
                component={Explore}
            />
        </HomeBottomTabs.Navigator >);
}

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
                component={BottomTabs}
            />
        </HomeDrawerNavigation.Navigator>
    );
}