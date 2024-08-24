import React from "react";
import { FlatList, View, RefreshControl, ListRenderItem } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { debounce } from "lodash";
import { RootState } from "~/stores";
import Text from "~/components/Text";
import { GlobalStyles } from "~/config/styles";
import { ITEM_HEIGHT, ITEM_SPACING, styles } from "./styles";
import { Course } from "~/api/model";
import { getAvailableCourses } from "./helper";
import { CourseItem } from "./components/CourseItem";

const RENDER_PER_PAGE = 15;

const mapStateToProps = (state: RootState) => ({
    data: state.course.available[state.app.language || 'en'] || []
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Explore: React.FC<PropsFromRedux> = ({ data }) => {
    const [displayedData, setDisplayedData] = React.useState<Course[]>(data.slice(0, RENDER_PER_PAGE));

    const onRefresh = React.useCallback(async (force?: boolean) => {
        const newData = await getAvailableCourses(force);
        setDisplayedData(newData.slice(0, RENDER_PER_PAGE));
    }, [data]);

    React.useEffect(() => {
        onRefresh();
    }, []);

    const loadMore = () => {
        const currentLength = displayedData.length;
        if (currentLength < data.length) {
            const nextData = data.slice(currentLength, currentLength + RENDER_PER_PAGE);
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
                ListHeaderComponent={<Text style={{}}>Header Text</Text>}
                keyExtractor={(item: Course) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(true)} />}
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
        </View>
    );
};

export default connector(Explore);
