import React from "react";
import { FlatList, View, RefreshControl, ListRenderItem, Dimensions } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "~/stores";
import { GlobalStyles } from "~/config/styles";
import { ITEM_HEIGHT, ITEM_SPACING, styles } from "./styles";
import { Course } from "~/api/model";
import { getAvailableCourses } from "~/api/helper";
import { CourseItem } from "./components/CourseItem";
import HeaderComponent from "./components/HeaderComponent";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthenticatedScreens } from "~/navigation/screens";

const RENDER_PER_PAGE = 8;

const connector = connect((state: RootState) => ({
    categories: state.course.categories[state.app.language] || [],
    data: state.course.available[state.app.language] || []
}));
const Explore: React.FC<ConnectedProps<typeof connector>> = ({ data, categories }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [displayedData, setDisplayedData] = React.useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<number>();
    const [selectedTab, setSelectedTab] = React.useState<number>(0);


    const onRefresh = React.useCallback(async (force?: boolean) => {
        getAvailableCourses(force);
    }, []);


    React.useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused]);

    const filteredData = React.useMemo(() => {
        return data
            .filter(c => selectedCategory === undefined || c.categoryId === selectedCategory)
            .sort((a, b) => selectedTab === 0 ? 0 : (b.traineeCount ?? 0) - (a.traineeCount ?? 0));
    }, [data, selectedCategory, selectedTab]);

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
        return <CourseItem item={item} category={categories.find(v => v.id === item.categoryId)!.name} onClick={() => navigation.navigate(AuthenticatedScreens.CourseInformation, { id: item.id })} />;
    }, []);


    return (
        <View style={GlobalStyles.screenContainer}>
            <FlatList
                data={displayedData}
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
                showsVerticalScrollIndicator={true}
                indicatorStyle={'black'}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(true)} />}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: 105 + (ITEM_HEIGHT + ITEM_SPACING) * index,
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
