import React from "react";
import { FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "~/stores";
import { GlobalStyles } from "~/config/styles";
import { ITEM_HEIGHT, ITEM_SPACING, styles } from "./styles";
import { t } from "~/translations";
import { NavigationProp, useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { getEnrolledCourses } from "~/api/helper";
import { Course, CourseStatus, TraineeCourse } from "~/api/model";
import { CourseItem } from "./components/CourseItem";
import HeaderComponent from "./components/HeaderComponent";

const RENDER_PER_PAGE = 15;

const connector = connect((state: RootState) => ({
    data: state.course.enrolled
}));
const Dashboard: React.FC<ConnectedProps<typeof connector>> = ({ data }) => {
    const [displayedData, setDisplayedData] = React.useState<TraineeCourse[]>([]);
    const [selectableOptions, setOptions] = React.useState<string[]>([
        'myCourse.inProgress',
        'myCourse.ebook',
        'myCourse.completed',
        'myCourse.badges',
    ]);
    const [selectedOptions, setSelectedOptions] = React.useState<string>('myCourse.inProgress');
    const navigation = useNavigation<NavigationProp<any>>();
    const isFocused = useIsFocused();

    // Memoize filtering logic
    const filterDisplayData = React.useCallback((incomingData: TraineeCourse[], updateState: boolean = true) => {
        let filteredData = [...incomingData];
        if (selectedOptions === 'myCourse.inProgress') {
            filteredData = filteredData.filter(C => C.enrollmentStatus === 'Enrolled' && ((C.progress && C.progress < 1) || !C.progress));
        } else if (selectedOptions === 'myCourse.completed') {
            filteredData = filteredData.filter(C => C.progress && C.progress >= 1);
        } else if (selectedOptions === 'myCourse.archived') {
            filteredData = filteredData.filter(C => C.status === CourseStatus.Archived);
        } else filteredData = [];
        const sortedData = filteredData.sort((a, b) => new Date(b.lastAccessDate).getTime() - new Date(a.lastAccessDate).getTime());
        if (updateState) {
            const newData = sortedData.slice(0, RENDER_PER_PAGE);
            if (JSON.stringify(displayedData) !== JSON.stringify(newData)) {
                setDisplayedData(newData);
            }
        }
        return filteredData;
    }, [selectedOptions]);

    const fetchData = React.useCallback(async (force: boolean = false) => {
        const newData = await getEnrolledCourses(force);
        const newOptions = [
            'myCourse.inProgress',
            'myCourse.ebook',
            'myCourse.completed',
            'myCourse.badges',
        ];
        if (newData.some(C => C.status === CourseStatus.Archived)) {
            newOptions.push('myCourse.archived');
        }
        setOptions(newOptions);
        filterDisplayData(newData);
    }, [filterDisplayData]);


    React.useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    React.useEffect(() => {
        filterDisplayData(data);
    }, [selectedOptions, data, filterDisplayData]);

    const loadMore = () => {
        const currentLength = displayedData.length;
        const filteredData = filterDisplayData(data, false);

        if (currentLength < filteredData.length) {
            const nextData = filteredData.slice(currentLength, currentLength + RENDER_PER_PAGE);
            setDisplayedData(prevData => [...prevData, ...nextData]);
        }
    };


    const onRefresh = React.useCallback(() => {
        fetchData(false);
    }, [fetchData]);

    const renderItem: ListRenderItem<Course> = React.useCallback(({ item }) => {
        return <CourseItem item={item} />;
    }, []);

    const keyExtractor = (item: Course) => item.id.toString();

    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                data={displayedData}
                renderItem={renderItem}
                ListHeaderComponent={
                    <HeaderComponent
                        categories={selectableOptions}
                        selected={selectedOptions}
                        onSelect={s => setSelectedOptions(s!)}
                    />
                }
                keyExtractor={keyExtractor}
                refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
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