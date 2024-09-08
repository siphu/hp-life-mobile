import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthenticatedScreens} from '../screens';
import React from 'react';
import {RootStackParamList} from '..';
import CourseSideMenuDrawer from '~/components/CourseSideMenuDrawer';
import {CourseScreenStack} from './CourseScreenStack';
import CourseProvider, {
  useCourseProviderContext,
} from '~/providers/CourseProvider';
import {StackScreenProps} from '@react-navigation/stack';

const CourseDrawerNavigation = createDrawerNavigator<RootStackParamList>();

type CourseDrawerProps = StackScreenProps<
  RootStackParamList,
  AuthenticatedScreens.CourseDrawer
>;

export const CourseDrawer = ({route, navigation}: CourseDrawerProps) => {
  return (
    <CourseProvider route={route} navigation={navigation}>
      <CourseDrawerNavigation.Navigator
        useLegacyImplementation={false}
        initialRouteName={AuthenticatedScreens.CourseScreenStack}
        drawerContent={props => <CourseSideMenuDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          headerTitle: '',
          drawerType: 'front',
          drawerPosition: 'right',
          drawerStyle: {width: '100%'},
        }}>
        <CourseDrawerNavigation.Screen
          name={AuthenticatedScreens.CourseScreenStack}
          component={CourseScreenStack}
        />
      </CourseDrawerNavigation.Navigator>
    </CourseProvider>
  );
};

export default CourseDrawer;
