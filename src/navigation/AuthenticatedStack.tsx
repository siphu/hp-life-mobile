import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AuthenticatedScreens} from './screens';
import {HomeDrawer} from './Groups/HomeDrawerTab';
import Profile from '~/screens/Profile';
import {HeaderBackIcon} from './components/HeaderBackIcon';
import {GlobalStyles} from '~/config/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import InAppBrowser from '~/screens/InAppBrowser';
import Notification from '~/screens/Notification';
import {HeaderMenuIcon} from './components/HeaderMenuIcon';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import {HeaderLessonIcon} from './components/HeaderLessonIcon';
import CourseDrawer from './Groups/CourseDrawer';
import {RootStackParamList} from '.';
import ChangePassword from '~/screens/ChangePassword';
import CourseProvider from '~/providers/CourseProvider';

const Screen = createStackNavigator<RootStackParamList>();

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
      }}>
      <Screen.Screen
        name={AuthenticatedScreens.HomeDrawer}
        component={HomeDrawer}
      />
      <Screen.Screen
        name={AuthenticatedScreens.Profile}
        component={Profile}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
        })}
      />
      <Screen.Screen
        name={AuthenticatedScreens.InAppBrowser}
        component={InAppBrowser}
        options={({navigation, route}) => ({
          headerShown: true,
          headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
          //@ts-ignore
          title: route.params?.title || '',
        })}
      />
      <Screen.Screen
        name={AuthenticatedScreens.ChangePassword}
        component={ChangePassword}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
        })}
      />
      <Screen.Screen
        name={AuthenticatedScreens.CourseDrawer}
        component={CourseDrawer}
      />
      <Screen.Screen
        name={AuthenticatedScreens.Notification}
        component={Notification}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
        })}
      />
    </Screen.Navigator>
  );
};
