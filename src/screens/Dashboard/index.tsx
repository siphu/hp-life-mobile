import React from "react";
import { Dimensions, FlatList, Image, ListRenderItem, Pressable, RefreshControl, ScrollView, View } from "react-native"
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { getCategories } from "~/api/rest/courses";
import Alert from "~/components/Alert";
import Text from "~/components/Text"
import { RootState } from "~/stores";
import { setCategory } from "~/stores/course/actions";
import { GlobalStyles } from "~/config/styles";
import { ITEM_HEIGHT, ITEM_SPACING, styles } from "./styles";

import { t } from "~/translations";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getEnrolledCourses } from "./helper";
import { Course, TraineeCourse } from "~/api/model";
import { CourseItem } from "./components/CourseItem";
import { debounce } from "lodash";

const RENDER_PER_PAGE = 15;

const mapStateToProps = (state: RootState) => ({
    data: state.course.enrolled
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = ({ data }) => {
    const [displayedData, setDisplayedData] = React.useState<TraineeCourse[]>(data.slice(0, RENDER_PER_PAGE));
    const navigation = useNavigation<NavigationProp<any>>();

    const onRefresh = React.useCallback((async (force?: boolean) => {
        const newData = await getEnrolledCourses(force);
        const sortedData = newData.sort((a, b) => new Date(b.lastAccessDate).getTime() - new Date(a.lastAccessDate).getTime());
        setDisplayedData(sortedData.slice(0, RENDER_PER_PAGE));
    }), [data]);


    React.useEffect(() => {
        onRefresh();
    }, []);

    const loadMore = () => {
        const currentLength = displayedData.length;
        if (currentLength < data.length) {
            const sortedData = data.sort((a, b) => new Date(b.lastAccessDate).getTime() - new Date(a.lastAccessDate).getTime());
            const nextData = sortedData.slice(currentLength, currentLength + RENDER_PER_PAGE);
            setDisplayedData(prevData => [...prevData, ...nextData]);
        }
    };

    const renderItem: ListRenderItem<Course> = React.useCallback(({ item }) => {
        return <CourseItem item={item} />;
    }, []);

    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                data={displayedData}
                renderItem={renderItem}
                ListHeaderComponent={<Text style={{}}>{t('myCourse.inProgress')}</Text>}
                keyExtractor={(item: Course) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: (ITEM_HEIGHT + ITEM_SPACING) * index,
                    index,
                })}
                initialNumToRender={RENDER_PER_PAGE}
                maxToRenderPerBatch={RENDER_PER_PAGE}
                windowSize={5}
                removeClippedSubviews={true}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        </View >
    );

}

export default connector(Dashboard);