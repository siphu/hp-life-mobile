import React from "react";
import { Dimensions, FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "~/stores";
import { GlobalStyles } from "~/config/styles";
import { ITEM_SPACING, styles } from "./styles";
import { NavigationProp, useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getEnrolledCourses } from "~/api/helper";
import { Course, CourseStatus, TraineeCourse } from "~/api/model";
import { CourseItem } from "./components/CourseItem";
import HeaderComponent from "./components/HeaderComponent";
import { AuthenticatedScreens } from "~/navigation/screens";

const RENDER_PER_PAGE = 8;

const connector = connect((state: RootState) => ({
    online: state.app.online,
    data: state.course.enrolled.sort((a, b) => new Date(b.lastAccessDate).getTime() - new Date(a.lastAccessDate).getTime()),
    options: !state.app.online ? ['myCourse.ebook'] :
        state.course.enrolled.some(C => C.status === CourseStatus.Archived) ?
            ['myCourse.inProgress', 'myCourse.ebook', 'myCourse.completed', 'myCourse.badges', 'myCourse.archived'] :
            ['myCourse.inProgress', 'myCourse.ebook', 'myCourse.completed', 'myCourse.badges']
}));

const Dashboard: React.FC<ConnectedProps<typeof connector>> = ({ data, options, online }) => {
    const navigation = useNavigation();
    const route = useRoute<{
        key: string;
        name: string;
        params: {
            category?: string;
        };
    }>();
    const isFocused = useIsFocused();
    const [displayedData, setDisplayedData] = React.useState<TraineeCourse[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<string>(!online ? 'myCourse.ebook' : (route.params?.category || 'myCourse.inProgress'));


    const onRefresh = React.useCallback(async (force?: boolean) => {
        getEnrolledCourses(force);
    }, []);

    React.useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused]);

    const filteredData = React.useMemo(() => {
        let newData = [...data];
        if (selectedOptions === 'myCourse.inProgress') {
            newData = newData.filter(C => C.enrollmentStatus === 'Enrolled' && ((C.progress && C.progress < 1) || !C.progress));
        } else if (selectedOptions === 'myCourse.completed') {
            newData = newData.filter(C => C.progress && C.progress >= 1);
        } else if (selectedOptions === 'myCourse.archived') {
            newData = newData.filter(C => C.status === CourseStatus.Archived);
        } else {
            newData = [];
        }
        return newData;
    }, [data, selectedOptions]);

    React.useEffect(() => {
        setDisplayedData(filteredData.slice(0, RENDER_PER_PAGE));
    }, [filteredData]);


    const loadMore = () => {
        const currentLength = displayedData.length;
        if (currentLength < filteredData.length) {
            const nextData = filteredData.slice(currentLength, currentLength + RENDER_PER_PAGE);
            setDisplayedData(prevData => [...prevData, ...nextData]);
        }
    };

    const renderItem: ListRenderItem<Course> = React.useCallback(({ item }) => {
        return <CourseItem item={item} onClick={() => navigation.navigate(AuthenticatedScreens.CourseInformation, { id: item.id })} />;
    }, []);

    React.useEffect(() => {
        if (route.params?.category && route.params?.category !== selectedOptions) {
            setSelectedOptions(route.params?.category);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);

    const ITEM_HEIGHT = React.useMemo(() => Dimensions.get('screen').width * .40, []);
    return (
        <View style={GlobalStyles.screenContainer}>
            <FlatList
                data={displayedData}
                renderItem={renderItem}
                ListHeaderComponent={
                    <HeaderComponent
                        categories={options}
                        selected={selectedOptions}
                        onSelect={s => setSelectedOptions(s!)}
                    />
                }
                keyExtractor={(item: Course) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(true)} />}
                showsVerticalScrollIndicator={true}
                indicatorStyle={'black'}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: 70 + (ITEM_HEIGHT + ITEM_SPACING) * index,
                    index,
                })}
                initialNumToRender={RENDER_PER_PAGE}
                maxToRenderPerBatch={RENDER_PER_PAGE}
                windowSize={Math.ceil(RENDER_PER_PAGE / 2)}
                removeClippedSubviews={true}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

export default connector(Dashboard);