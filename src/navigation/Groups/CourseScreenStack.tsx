import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticatedScreens } from "../screens";
import { RootStackParamList } from "..";
import CourseInformation from "~/screens/CourseInformation";
import CourseExecution from "~/screens/CourseExecution";;
import { GlobalStyles } from "~/config/styles";
import { HeaderBackIcon } from "../components/HeaderBackIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { HeaderLessonIcon } from "../components/HeaderLessonIcon";
import React from "react";

const CourseScreenStackNavigator = createStackNavigator<RootStackParamList>();

export const CourseScreenStack = () => {
    const insets = useSafeAreaInsets();
    return (<CourseScreenStackNavigator.Navigator
        initialRouteName={AuthenticatedScreens.CourseInformation}
        screenOptions={({ navigation }) => ({
            headerShown: true,
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