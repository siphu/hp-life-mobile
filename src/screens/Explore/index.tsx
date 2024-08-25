import React from "react";
import { FlatList, View, RefreshControl, ListRenderItem } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "~/stores";
import { GlobalStyles } from "~/config/styles";
import { ITEM_HEIGHT, ITEM_SPACING, styles } from "./styles";
import { Course } from "~/api/model";
import { getAvailableCourses } from "~/api/helper";
import { CourseItem } from "./components/CourseItem";
import HeaderComponent from "./components/HeaderComponent";

const RENDER_PER_PAGE = 15;

const mapStateToProps = (state: RootState) => ({
    categories: state.course.categories[state.app.language] || [],
    data: state.course.available[state.app.language] || []
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Explore: React.FC<PropsFromRedux> = ({ data, categories }) => {
    const [displayedData, setDisplayedData] = React.useState<Course[]>(data.slice(0, RENDER_PER_PAGE));
    const [selectedCategory, setSelectedCategory] = React.useState<number>();
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const onRefresh = React.useCallback(async (force?: boolean) => {
        const newData = await getAvailableCourses(force);
        setDisplayedData(newData.slice(0, RENDER_PER_PAGE));
    }, [data]);

    React.useEffect(() => {
        onRefresh();
    }, []);


    const filteredData = React.useMemo(() =>
        data.filter(c => selectedCategory === undefined || c.categoryId === selectedCategory)
            .sort((a, b) => selectedTab === 0 ? 0 : (b.traineeCount ?? 0) - (a.traineeCount ?? 0))
        , [data, selectedCategory, selectedTab]);


    const loadMore = () => {
        const currentLength = displayedData.length;
        if (currentLength < filteredData.length) {
            const nextData = filteredData.slice(currentLength, currentLength + RENDER_PER_PAGE);
            setDisplayedData(prevData => [...prevData, ...nextData]);
        }
    };



    const renderItem: ListRenderItem<Course> = React.useCallback(({ item }) => {
        return <CourseItem item={item} />;
    }, []);

    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                ListHeaderComponent={
                    <HeaderComponent
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={s => setSelectedCategory(s)}
                        selectedTab={selectedTab}
                        onTabSelect={setSelectedTab}
                    />
                }
                keyExtractor={(item: Course) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh()} />}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: (ITEM_HEIGHT + ITEM_SPACING) * index,
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
};

export default connector(Explore);
