import { createDrawerNavigator, DrawerScreenProps, useDrawerStatus } from "@react-navigation/drawer";
import { DrawerActions, RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, ConnectedProps, shallowEqual, useSelector } from "react-redux";
import { RootState } from "~/stores";
import { AuthenticatedScreens } from "../screens";
import React from "react";
import { HeaderMenuIcon } from "../components/HeaderMenuIcon";
import { HeaderNotificationIcon } from "../components/HeaderNotificationIcon";
import { HeaderLessonIcon } from "../components/HeaderLessonIcon";
import { HeaderBackIcon } from "../components/HeaderBackIcon";
import { GlobalStyles } from "~/config/styles";
import CourseInformation from "~/screens/CourseInformation";
import { RootStackParamList } from "..";
import CourseExecution from "~/screens/CourseExecution";
import CourseSideMenuDrawer from "~/components/CourseSideMenuDrawer";
import { Course, getParticipantCourse, getParticipantLessons, getTraineeCourse, Task, TraineeCourse } from "~/api/endpoints";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import Loader from "~/components/Loader";
import { getAvailableCourses, getEnrolledCourses } from "~/api/helpers";
import Text from "~/components/Text";
import { CourseScreens } from "./CourseScreens";

const CourseDrawerNavigation = createDrawerNavigator<RootStackParamList>();

export type CourseDrawerProps = StackScreenProps<RootStackParamList, AuthenticatedScreens.CourseInformation>;

const connector = connect((state: RootState, ownProps: CourseDrawerProps) => {
    const courseId = ownProps.route.params.courseId;
    const enrolledCourse = state.course.enrolled.find(course => course.id === courseId);
    return {
        courseId,
        taskId: ownProps.route.params.taskId,
        enrolled: !!enrolledCourse,
        route: ownProps.route,
        navigation: ownProps.navigation,
        ts: ownProps.route.params.ts
    };
});

const CourseDrawer: React.FC<ConnectedProps<typeof connector>> = ({ enrolled, courseId, taskId, ts, navigation }) => {

    const insets = useSafeAreaInsets();
    const [courseInformation, setCourse] = React.useState<Course | undefined>();
    const [task, setTask] = React.useState<Task | undefined>();

    const fetchData = React.useCallback(async (tId?: number) => {

        let requestedTaskId = tId ?? taskId;
        let isEnrolled = enrolled;

        if (ts) {
            const newEnrolledCourses = await getEnrolledCourses(true);
            isEnrolled = newEnrolledCourses.some(c => c.id === courseId);

            if (!enrolled && isEnrolled) {
                getAvailableCourses(true);
            }
        }

        if (isEnrolled) {
            const course = await getTraineeCourse(courseId);
            setCourse(course);

            const allTasks = course.lessons?.flatMap(lesson => lesson.tasks) || [];
            const foundTask = allTasks.find(t => t.id === requestedTaskId);
            setTask(foundTask);

        } else {
            const [c, l] = await Promise.all([getParticipantCourse(courseId), getParticipantLessons(courseId)]);
            setCourse({ ...c, lessons: l });
        }
    }, [courseId, ts, taskId]);

    const onTaskChange = React.useCallback((tId?: number) => {
        if (courseInformation) {
            const allTasks = courseInformation!.lessons?.flatMap(lesson => lesson.tasks) || [];
            const foundTask = allTasks.find(t => t.id === tId);
            setTask(foundTask);
        }
    }, [courseInformation])

    React.useEffect(() => {
        fetchData();
    }, [courseId, ts, taskId]);

    const AllTasks = React.useMemo(() => courseInformation?.lessons!.flatMap(lesson => lesson.tasks), [courseInformation]);
    const selectedTask = React.useMemo(() => task ? task : AllTasks && AllTasks.length > 0 ? AllTasks[0] : undefined, [task, AllTasks]);

    return (
        <>
            <Loader visible={!courseInformation} />
            <CourseDrawerNavigation.Navigator
                initialRouteName={'CourseScreenStack'}
                drawerContent={
                    (props) => courseInformation && <CourseSideMenuDrawer
                        {...props}
                        course={courseInformation}
                        task={task}
                        courseId={courseId}
                        enrolled={enrolled} />}
                screenOptions={{
                    headerShown: false,
                    headerTitle: '',
                    drawerType: 'front',
                    drawerPosition: 'right',
                    drawerStyle: {
                        width: '100%',
                    },
                }}
            >
                <CourseDrawerNavigation.Screen
                    name={'CourseScreenStack'}
                    children={() => (
                        <CourseScreens
                            course={courseInformation!}
                            task={selectedTask}
                            enrolled={enrolled}
                            onTaskChange={onTaskChange}
                            onForceUpdate={fetchData} />
                    )}
                />
            </CourseDrawerNavigation.Navigator>
        </>
    );
};


const ConnectedCourseDrawer = connector(CourseDrawer);
export default ConnectedCourseDrawer;