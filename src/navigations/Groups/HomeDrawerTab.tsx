import {
    createDrawerNavigator,
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
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { config } from '~/config/config';

const HomeDrawerNavigation = createDrawerNavigator();
const HomeBottomTabs = createBottomTabNavigator();

/**
 * Screens access via the Drawer Navigation (Side Menu)
 * @returns
 */

export const BottomTabs = () => {
    return (
        <HomeBottomTabs.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                    case AuthenticatedScreens.Home: return <Icon name="home" size={size * .75} color={focused ? config.color.blue.primary : color} />
                    case AuthenticatedScreens.Dashboard: return <Icon name="graduation" size={size * .75} color={focused ? config.color.blue.primary : color} />
                    case AuthenticatedScreens.Explore: return <Icon name="magnifier" size={size * .75} color={focused ? config.color.blue.primary : color} />
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
    return (
        <HomeDrawerNavigation.Navigator
            initialRouteName={AuthenticatedScreens.HomeTabs}
            drawerContent={props => <SideMenuDrawer {...props} />}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    height: GlobalStyles.header.height + insets.top,
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: GlobalStyles.header.backgroundColor,
                },
                headerBackground: () => <HeaderLogo />,
                headerTitle: '',
                drawerType: 'front',
                drawerStyle: {
                    width:
                        '100%'
                },
            }}>
            <HomeDrawerNavigation.Screen
                name={AuthenticatedScreens.HomeTabs}
                component={BottomTabs}
            />
        </HomeDrawerNavigation.Navigator>
    );
}