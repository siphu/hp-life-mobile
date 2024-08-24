import React from "react";
import { FlatList, Pressable, RefreshControl, ScrollView, View } from "react-native"
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { getCategories } from "~/api/rest/courses";
import Alert from "~/components/Alert";
import Text from "~/components/Text"
import { RootState } from "~/stores";
import { setCategory } from "~/stores/course/actions";
import { getLatestCourses } from "./helper";
import { GlobalStyles } from "~/config/styles";
import { styles } from "./styles";
import Jumbotron from "./components/Jumbotron";
import { t } from "~/translations";
import { NavigationProp, useNavigation } from "@react-navigation/native";


const mapStateToProps = (state: RootState) => ({
    courseState: state.course,
    appState: state.app,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Home: React.FC<PropsFromRedux> = ({ courseState, appState }) => {

    const navigation = useNavigation<NavigationProp<any>>();

    const onRefresh = (force?: boolean) => {
        getLatestCourses(force);
    }

    React.useEffect(() => {
        onRefresh();
    }, []);

    const latestCourses = courseState.latest[appState.language || 'en'];
    return (
        <View style={GlobalStyles.flex}>
            <FlatList
                style={styles.scrollStyle}
                contentContainerStyle={styles.scrollContent}
                ListHeaderComponent={<Text style={styles.textLatestCourseHeader}>{t('home.latestCourse')}</Text>}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(true)} />}
                data={latestCourses}
                renderItem={({ item }) => <Jumbotron course={item} key={item.id.toString()} navigation={navigation} />}
            />
        </View >
    );

}

export default connector(Home);