import { DrawerScreenProps } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Course, Task, TraineeCourse } from "~/api/endpoints";
import Text from "~/components/Text";
import { GlobalStyles } from "~/config/styles";
import { RootStackParamList } from "~/navigation";
import { AuthenticatedScreens } from "~/navigation/screens";
import { useCourseProviderContext } from "~/providers/CourseProvider";
import { contentParser } from "./helper";
import { config } from "~/config/config";
import Loader from "~/components/Loader";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "~/components/Webview";
import { OrientationLocker } from "react-native-orientation-locker";

interface Props {
    route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseExecution>;
    navigation: StackNavigationProp<RootStackParamList, AuthenticatedScreens.CourseExecution, undefined>
}

const CourseExecution = ({ }: Props) => {
    const { course, task, taskDetail, fetching } = useCourseProviderContext();

    return <ScrollView style={GlobalStyles.screenContainer} contentContainerStyle={GlobalStyles.screenContainer}>
        <Loader visible={fetching} />
        <OrientationLocker orientation={'UNLOCK'} />
        {taskDetail && (<WebView
            autoExpand={true}
            style={{ flexGrow: 1, backgroundColor: config.color.neutral[50] }}
            scalesPageToFit={true}
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            scrollEnabled={false}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
            domStorageEnabled={true}
            bounces={false}
            source={contentParser(taskDetail.body!)}
        />)}
    </ScrollView>;
};

export default CourseExecution;