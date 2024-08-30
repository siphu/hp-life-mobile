import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerActions, RouteProp, useNavigation } from "@react-navigation/native";
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
import { Course, getParticipantCourse, getParticipantLessons, getTraineeCourse } from "~/api/endpoints";
import { StackScreenProps } from "@react-navigation/stack";
import Loader from "~/components/Loader";
import { getAvailableCourses, getEnrolledCourses } from "~/api/helpers";

const CourseDrawerNavigation = createDrawerNavigator<RootStackParamList>();

export type CourseDrawerProps = StackScreenProps<RootStackParamList, AuthenticatedScreens.CourseInformation>;

const connector = connect((state: RootState, ownProps: CourseDrawerProps) => {
    const courseId = ownProps.route.params.id;
    const enrolledCourse = state.course.enrolled.find(course => course.id === courseId);
    return {
        course: enrolledCourse || Object.values(state.course.available).flat().find(course => course.id === courseId),
        enrolled: !!enrolledCourse,
        courseId,
        route: ownProps.route,
        navigation: ownProps.navigation,
        ts: ownProps.route.params.ts
    };
});

const CourseDrawer: React.FC<ConnectedProps<typeof connector>> = ({ course, enrolled, courseId, ts, route, navigation }) => {
    const insets = useSafeAreaInsets();
    const [courseInformation, setCourse] = React.useState<Course | undefined>();

    React.useEffect(() => {
        const fetchData = async () => {
            let isEnrolled = enrolled;
            if (ts) {
                const newEnrolledCourses = await getEnrolledCourses(true);
                isEnrolled = !!newEnrolledCourses.find(c => c.id === courseId);
                if (!enrolled && isEnrolled) {
                    getAvailableCourses(true);
                }
            }

            if (isEnrolled) {
                getTraineeCourse(courseId).then(setCourse);
            } else {
                Promise.all([getParticipantCourse(courseId), getParticipantLessons(courseId)]).then(([c, l]) => {
                    setCourse({ ...c, lessons: l });
                });
            }
        };

        fetchData();
    }, [courseId, ts]);

    return (
        <>
            <Loader visible={!courseInformation} />
            <CourseDrawerNavigation.Navigator
                initialRouteName={AuthenticatedScreens.CourseDetail}
                drawerContent={(props) => courseInformation && <CourseSideMenuDrawer {...props} course={courseInformation} courseId={courseId} enrolled={enrolled} />}
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        height: GlobalStyles.header.height + insets.top,
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: GlobalStyles.header.backgroundColor,
                    },
                    headerLeft: () => <HeaderBackIcon onPress={navigation.goBack} />,
                    headerRight: () => (
                        <HeaderLessonIcon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                    ),
                    headerTitle: '',
                    drawerType: 'front',
                    drawerPosition: 'right',
                    drawerStyle: {
                        width: '90%',
                    },
                }}
            >
                <CourseDrawerNavigation.Screen
                    name={AuthenticatedScreens.CourseDetail}
                    children={({ route, navigation }) => (
                        courseInformation && (<CourseInformation
                            courseId={courseId}
                            course={courseInformation}
                            enrolled={enrolled}
                            route={route}
                            navigation={navigation}
                        />))
                    } />
                <CourseDrawerNavigation.Screen
                    name={AuthenticatedScreens.CourseExecution}
                    children={({ route, navigation }) => (
                        courseInformation && (<CourseExecution
                            courseId={courseId}
                            course={courseInformation}
                            enrolled={enrolled}
                            route={route}
                            navigation={navigation}
                        />))
                    } />
            </CourseDrawerNavigation.Navigator>
        </>
    );
};


const ConnectedCourseDrawer = connector(CourseDrawer);
export default ConnectedCourseDrawer;