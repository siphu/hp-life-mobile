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

type CourseInformationParams = {
    id: number;
};

const connector = connect((state: RootState, ownProps: { route: RouteProp<{ params: CourseInformationParams }> }) => {
    const courseId = ownProps.route.params.id;
    const enrolledCourse = state.course.enrolled.find(course => course.id === courseId);
    return {
        enrolled: !!enrolledCourse,
        courseId
    };
});

const CourseInformation: React.FC<ConnectedProps<typeof connector>> = ({ enrolled, courseId }) => {
    const [courseInformation, setCourse] = React.useState<Course | undefined>();

    React.useEffect(() => {
        getParticipantCourse(courseId).then(setCourse);
    }, [courseId]);

    if (!courseInformation) return null;

    const additionalCss = `
    body {
      word-break: break-word;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
    };`;

    return (
        <ScrollView style={GlobalStyles.screenContainer} contentContainerStyle={{ flex: 1 }}>
            <FastImage
                style={{
                    height: Dimensions.get('screen').width * .75,
                    width: '100%',
                }}
                source={{
                    uri: courseInformation.imageUrl,
                }}
            />
            <View style={{ padding: 20, flex: 1, backgroundColor: config.color.neutral[50] }}>
                <WebView
                    autoExpand={true}
                    bounces={false}
                    source={{ html: HTMLWrapper(courseInformation.body || '', additionalCss) }} />
            </View>
        </ScrollView>
    );
};


const ConnectedCourseInformation = connector(CourseInformation);

const CourseInformationWrapper: React.FC = () => {
    const route = useRoute<RouteProp<{ params: CourseInformationParams }>>();
    return <ConnectedCourseInformation route={route} />;
};

export default CourseInformationWrapper;
