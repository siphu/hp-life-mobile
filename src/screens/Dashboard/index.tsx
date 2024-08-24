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
import { Course } from "~/api/model";


const mapStateToProps = (state: RootState) => ({
    courseState: state.course,
    appState: state.app,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Home: React.FC<PropsFromRedux> = ({ courseState, appState }) => {

    const navigation = useNavigation<NavigationProp<any>>();

    const onRefresh = (force?: boolean) => {
        getEnrolledCourses(force);
    }

    React.useEffect(() => {
        onRefresh(true);
    }, []);

    const renderItem: ListRenderItem<Course> = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image src={item.imageUrl} style={{
                    height: '100%',
                    width: 100
                }} />
                <Text>{item.name}</Text>
            </View>
        );
    }

    console.log('length', courseState.enrolled.length);

    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                data={courseState.enrolled}
                renderItem={renderItem}
                ListHeaderComponent={<Text style={{}}>Header Text</Text>}
                keyExtractor={(item: Course) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: (ITEM_HEIGHT + ITEM_SPACING) * index,
                    index,
                })}
                initialNumToRender={15} // Adjust based on your performance needs
                maxToRenderPerBatch={15} // Adjust based on your performance needs
                windowSize={10} // Adjust based on your performance needs
                removeClippedSubviews={true} // Improves performance by removing items outside of view
            />
        </View >
    );

}

export default connector(Home);