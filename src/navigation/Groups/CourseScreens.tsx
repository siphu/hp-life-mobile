import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticatedScreens } from "../screens";
import { RootStackParamList } from "..";
import CourseInformation from "~/screens/CourseInformation";
import CourseExecution from "~/screens/CourseExecution";
import { Course, Task, TraineeCourse } from "~/api/endpoints";
import { GlobalStyles } from "~/config/styles";
import { HeaderBackIcon } from "../components/HeaderBackIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { HeaderLessonIcon } from "../components/HeaderLessonIcon";
import React from "react";

const CourseScreenStack = createStackNavigator<RootStackParamList>();

interface CourseScreensProps {
    course: Course;
    task?: Task;
    enrolled: boolean;
    onTaskChange: (taskId?: number) => void;
    onForceUpdate: (taskId?: number) => void;
}

export const CourseScreens = ({ course, task, enrolled, onTaskChange, onForceUpdate }: CourseScreensProps) => {
    const insets = useSafeAreaInsets();

    return (<CourseScreenStack.Navigator
        initialRouteName={AuthenticatedScreens.CourseDetail}
        screenOptions={({ navigation }) => ({
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
                <HeaderLessonIcon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
            ),
            headerBackTitleVisible: false,
            title: '',
        })}
    >
        <CourseScreenStack.Screen
            name={AuthenticatedScreens.CourseDetail}
            children={({ route, navigation }) => (
                <CourseInformation course={course} route={route} navigation={navigation} enrolled={enrolled} />
            )}
        />
        <CourseScreenStack.Screen
            name={AuthenticatedScreens.CourseExecution}
            children={({ route, navigation }) => {
                // Add a listener that reacts to parameter changes
                React.useEffect(() => {
                    const unsubscribe = navigation.addListener('state', () => {
                        const taskId = route.params?.taskId;
                        onTaskChange(taskId);
                    });
                    return unsubscribe;
                }, [navigation, route.params?.taskId]);

                return course && task ? <CourseExecution
                    course={course as TraineeCourse}
                    task={task}
                    route={route}
                    navigation={navigation}
                    onForceUpdate={onForceUpdate}
                /> : null;
            }}
        />
    </CourseScreenStack.Navigator>);

}