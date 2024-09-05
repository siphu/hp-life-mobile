import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticatedScreens } from "../screens";
import { RootStackParamList } from "..";
import CourseInformation from "~/screens/CourseInformation";
import CourseExecution from "~/screens/CourseExecution";;
import { GlobalStyles } from "~/config/styles";
import { HeaderBackIcon } from "../components/HeaderBackIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { HeaderLessonIcon } from "../components/HeaderLessonIcon";
import React from "react";
import Orientation, { OrientationType } from "react-native-orientation-locker";
import { Dimensions } from "react-native";

const CourseScreenStackNavigator = createStackNavigator<RootStackParamList>();

export const CourseScreenStack = () => {
    const [showHeader, setShowHeader] = React.useState<boolean>(Dimensions.get('screen').width < Dimensions.get('screen').height);

    const onOrientationChange = React.useCallback((orientation: OrientationType) => {
        setShowHeader(!['LANDSCAPE-RIGHT', 'LANDSCAPE-LEFT'].includes(orientation));
    }, [showHeader]);

    React.useEffect(() => {
        Orientation.addOrientationListener(onOrientationChange);
        return () => Orientation.removeDeviceOrientationListener(onOrientationChange);
    }, []);

    const insets = useSafeAreaInsets();

    return (<CourseScreenStackNavigator.Navigator
        initialRouteName={AuthenticatedScreens.CourseInformation}
        screenOptions={({ navigation }) => ({
            headerShown: showHeader,
            headerStyle: {
                height: GlobalStyles.header.height + insets.top,
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: GlobalStyles.header.backgroundColor,
            },
            headerLeft: () => (<HeaderBackIcon onPress={() => navigation.goBack()} />),
            headerRight: () => (<HeaderLessonIcon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />),
            headerBackTitleVisible: false,
            title: '',
        })} >
        <CourseScreenStackNavigator.Screen
            name={AuthenticatedScreens.CourseInformation}
            component={CourseInformation}
        />
        <CourseScreenStackNavigator.Screen
            name={AuthenticatedScreens.CourseExecution}
            component={CourseExecution}
        />
    </CourseScreenStackNavigator.Navigator>);
}