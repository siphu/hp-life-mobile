import React from 'react';
import { Dimensions, ScrollView, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import WebView from "~/components/Webview";
import { RootState } from "~/stores";
import FastImage from '@d11/react-native-fast-image';
import { Course, getParticipantCourse } from '~/api/endpoints';
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { HTMLWrapper } from '~/utils';
import HeaderImage from './components/HeaderImage';
import { ActionBar } from './components/ActionBar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';
import { StackNavigationProp } from '@react-navigation/stack';


interface Props {
    course: Course;
    courseId: number;
    enrolled: boolean;
    route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseDetail>;
    navigation: StackNavigationProp<RootStackParamList, AuthenticatedScreens.CourseDetail, undefined>
}

const CourseInformation = ({ course, courseId, enrolled }: Props) => {
    const inset = useSafeAreaInsets();
    //const { course, courseId, enrolled } = route.params;

    console.log('course', course);

    if (!course) return null;

    const additionalCss = `
    body {
      word-break: break-word;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
    };`;

    return (
        <ScrollView style={GlobalStyles.screenContainer} showsVerticalScrollIndicator={false}>
            <HeaderImage course={course} />
            <ActionBar course={course} />
            <View style={{ paddingHorizontal: 20, backgroundColor: config.color.neutral[50] }}>
                {course && (
                    <WebView
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingBottom: inset.bottom }}
                        autoExpand={true}
                        bounces={false}
                        source={{ html: HTMLWrapper(course.body || '', additionalCss) }} />
                )}
            </View>
        </ScrollView >
    );
};

export default CourseInformation;
