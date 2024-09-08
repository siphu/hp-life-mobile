import {createStackNavigator} from '@react-navigation/stack';
import {AuthenticatedScreens} from '../screens';
import {RootStackParamList} from '..';
import CourseInformation from '~/screens/CourseInformation';
import CourseExecution from '~/screens/CourseExecution';
import {GlobalStyles} from '~/config/styles';
import {HeaderBackIcon} from '../components/HeaderBackIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerActions} from '@react-navigation/native';
import {HeaderLessonIcon} from '../components/HeaderLessonIcon';
import React from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {Dimensions} from 'react-native';
import {RootState} from '~/stores';
import {connect} from 'react-redux';

const CourseScreenStackNavigator = createStackNavigator<RootStackParamList>();

const mapStateToProps = (state: RootState) => {
  return {
    orientation: state.app.orientation,
  };
};
export const CourseScreenStack = connect(mapStateToProps)(({
  orientation,
}: {
  orientation: 'Portrait' | 'Landscape';
}) => {
  const insets = useSafeAreaInsets();

  return (
    <CourseScreenStackNavigator.Navigator
      initialRouteName={AuthenticatedScreens.CourseInformation}
      screenOptions={({navigation}) => ({
        headerShown: true,
        headerStyle: {
          height: GlobalStyles.header.height + insets.top,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: GlobalStyles.header.backgroundColor,
        },
        headerLeft: () => (
          <HeaderBackIcon onPress={() => navigation.goBack()} />
        ),
        headerRight: () => (
          <HeaderLessonIcon
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
        headerBackTitleVisible: false,
        title: '',
      })}>
      <CourseScreenStackNavigator.Screen
        name={AuthenticatedScreens.CourseInformation}
        component={CourseInformation}
      />
      <CourseScreenStackNavigator.Screen
        name={AuthenticatedScreens.CourseExecution}
        component={CourseExecution}
        options={{
          headerShown: orientation === 'Portrait',
        }}
      />
    </CourseScreenStackNavigator.Navigator>
  );
});
