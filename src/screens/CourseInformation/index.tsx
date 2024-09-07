import React from 'react';
import { RefreshControl, ScrollView, View } from "react-native";
import WebView from "~/components/Webview";
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';
import { RouteProp } from '@react-navigation/native';
import { HTMLWrapper } from '~/utils';
import HeaderImage from './components/HeaderImage';
import { ActionBar } from './components/ActionBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCourseProviderContext } from '~/providers/CourseProvider';
import Loader from '~/components/Loader';

interface Props {
    route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseInformation>;
    navigation: StackNavigationProp<RootStackParamList, AuthenticatedScreens.CourseInformation, undefined>
}

const CourseInformation = ({ navigation }: Props) => {
    const { course, enrolled, update } = useCourseProviderContext();
    const [loading, setLoading] = React.useState<boolean>(!course);

    const additionalCss = `
    body {
      word-break: break-word;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
    };`;

    return (
        <View style={GlobalStyles.flex}>
            <Loader visible={loading} />
            {course && (
                <ScrollView style={GlobalStyles.screenContainer}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => update(true)} />}
                    showsVerticalScrollIndicator={false}>
                    <HeaderImage course={course} />
                    <ActionBar course={course} enrolled={enrolled} navigation={navigation} />
                    <View style={{ paddingHorizontal: 20, backgroundColor: config.color.neutral[50] }}>
                        {course && (
                            <WebView
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                autoExpand={true}
                                bounces={false}
                                startInLoadingState
                                key={course.body}
                                source={{ html: HTMLWrapper(course.body || '', additionalCss) }}
                                onLoadEnd={() => {
                                    setLoading(false);
                                }}
                            />
                        )}
                    </View>
                    <SafeAreaView edges={['bottom']} />
                </ScrollView >
            )}
        </View >
    );
};

export default CourseInformation;
