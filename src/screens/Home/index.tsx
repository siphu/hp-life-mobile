import React from "react";
import { FlatList, RefreshControl, View } from "react-native"
import { connect, ConnectedProps } from "react-redux";
import Text from "~/components/Text"
import { RootState } from "~/stores";
import { setCategory } from "~/stores/course/actions";
import { getAvailableCourses } from "~/api/helper";
import { GlobalStyles } from "~/config/styles";
import { styles } from "./styles";
import Jumbotron from "./components/Jumbotron";
import { NavigationProp, useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { t } from "~/providers/TranslationProvider";

const connector = connect((state: RootState) => ({
    data: (state.course.available[state.app.language] || [])
        .sort((a, b) => new Date(b.publishDate!).getTime() - new Date(a.publishDate!).getTime()).slice(0, 15) || [],
    language: state.app.language
}));
const Home: React.FC<ConnectedProps<typeof connector>> = ({ data }) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation<NavigationProp<any>>();

    const onRefresh = (force?: boolean) => {
        getAvailableCourses(force);
    }

    React.useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused]);
    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                style={styles.scrollStyle}
                contentContainerStyle={styles.scrollContent}
                ListHeaderComponent={<Text style={styles.textLatestCourseHeader}>{t('home.latestCourse')}</Text>}
                showsVerticalScrollIndicator={true}
                indicatorStyle={'black'}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(false)} />}
                data={data}
                renderItem={({ item }) => <Jumbotron course={item} key={item.id.toString()} navigation={navigation} />}
            />
        </View >
    );

}

export default connector(Home);