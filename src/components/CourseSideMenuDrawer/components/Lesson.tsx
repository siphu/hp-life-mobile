import React from "react";
import { Animated, FlatList, Pressable, View } from "react-native";
import { Course, Lesson as LessonModel, Task as TaskModel } from "~/api/endpoints";
import Text from "~/components/Text";
import { Task } from "./Task";
import { MaterialIcons } from "~/components/MaterialIcons";
import { config } from "~/config/config";
import { GlobalStyles } from "~/config/styles";
import { styles } from "../styles";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

export const Lesson = ({ course, lesson, selectedTask, navigation }: { course: Course; lesson: LessonModel; selectedTask?: TaskModel; navigation: DrawerNavigationHelpers }) => {
    const [expanded, setExpanded] = React.useState(true);
    const [contentHeight, setContentHeight] = React.useState(0);
    const finishedTask = React.useMemo(() => lesson.tasks.filter(t => !!t.finishDate).length, [lesson]);
    const animatedHeight = React.useRef(new Animated.Value(0)).current;

    const toggleExpanded = React.useCallback(() => {
        const targetHeight = expanded ? 0 : contentHeight;
        Animated.timing(animatedHeight, {
            toValue: targetHeight,
            duration: 100,
            useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
    }, [contentHeight, expanded, animatedHeight]);

    const onContentLayout = React.useCallback((event: { nativeEvent: { layout: { height: any; }; }; }) => {
        const { height } = event.nativeEvent.layout;
        if (height > contentHeight) {
            setContentHeight(height);
            animatedHeight.setValue(height);
        }
    }, [contentHeight, animatedHeight]);

    const LessonHeader = () => (
        <Pressable
            onPress={toggleExpanded}
            style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, { justifyContent: 'space-between', paddingHorizontal: 10 }]}
        >
            <Text style={styles.lessonName}>{`${lesson.name} - ${finishedTask}/${lesson.tasks.length}`}</Text>
            <MaterialIcons name={expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"} size={32} color={config.color.neutral[900]} />
        </Pressable>
    );

    return (
        <View style={{ paddingVertical: 10 }}>
            <LessonHeader />
            <Animated.View style={{ height: contentHeight === 0 ? 'auto' : animatedHeight, overflow: 'hidden' }}>
                <View style={{ paddingVertical: 8 }} onLayout={onContentLayout}>
                    <FlatList
                        keyExtractor={(item) => item.id.toString()}
                        data={lesson.tasks}
                        renderItem={({ item }) => (
                            <Task
                                course={course}
                                task={item}
                                selected={item.id === selectedTask?.id}
                                navigation={navigation}
                            />
                        )}
                    />
                </View>
            </Animated.View>
        </View>
    );
};
