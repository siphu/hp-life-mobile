import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedScreens } from '../screens';
import { RootStackParamList } from '..';
import CourseInformation from '~/screens/CourseInformation';
import CourseExecution from '~/screens/CourseExecution';
import { GlobalStyles } from '~/config/styles';
import { HeaderBackIcon } from '../components/HeaderBackIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import { HeaderLessonIcon } from '../components/HeaderLessonIcon';
import React from 'react';
import { RootState } from '~/stores';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { HeaderHelpIcon } from '../components/HeaderHelpIcon';
import { SupportAlert } from '../components/SupportAlert';

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
  const [showSupportBanner, setShowSupportBanner] =
    React.useState<boolean>(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <SupportAlert
        show={showSupportBanner}
        onClose={() => setShowSupportBanner(false)}
      />
      <CourseScreenStackNavigator.Navigator
        initialRouteName={AuthenticatedScreens.CourseInformation}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            height: GlobalStyles.header.height + insets.top,
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: GlobalStyles.header.backgroundColor,
          },
          headerLeft: () => (
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.alignCenter,
                { columnGap: 10 },
              ]}>
              <HeaderBackIcon onPress={() => navigation.goBack()} />
              <HeaderHelpIcon onPress={() => setShowSupportBanner(true)} />
            </View>
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
    </>
  );
});
