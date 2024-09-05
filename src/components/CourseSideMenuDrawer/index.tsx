import React from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { GlobalStyles } from "~/config/styles";
import { config } from "~/config/config";
import { Course, Task, Lesson as LessonModel } from "~/api/endpoints";
import { Lesson } from "./components/Lesson";
import { Header } from "./components/Header";
import { Information } from "./components/Information";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

export interface CourseSideMenuProps {
    course: Course;
    courseId: number;
    task?: Task;
    enrolled: boolean;
    navigation: DrawerNavigationHelpers;
}

type CourseSideMenuDrawerProps = CourseSideMenuProps & DrawerContentComponentProps;

const CourseSideMenuDrawer = ({ navigation, course, task, enrolled }: CourseSideMenuDrawerProps) => {
    const renderLesson = ({ item }: { item: LessonModel }) => (
        <Lesson
            course={course}
            lesson={item}
            selectedTask={task}
            navigation={navigation}
        />
    );

    const renderSeparator = () => (
        <View style={{ borderBottomWidth: 1, borderColor: config.color.misc.borderDark }} />
    );

    return (
        <View style={GlobalStyles.screenContainer}>
            <Header navigation={navigation} course={course} enrolled={enrolled} />
            <FlatList
                accessible={false}
                accessibilityRole="menu"
                style={GlobalStyles.screenContainer}
                data={course.lessons || []}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={<Information course={course} />}
                ListHeaderComponentStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: config.color.misc.borderDark
                }}
                ItemSeparatorComponent={renderSeparator}
                renderItem={renderLesson}
                ListFooterComponent={
                    <SafeAreaView edges={['bottom']}
                        style={{ borderTopWidth: 1, borderColor: config.color.misc.borderDark }} />
                }
            />
        </View>
    );
};

export default CourseSideMenuDrawer;
