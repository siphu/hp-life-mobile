import React from 'react';
import { Dimensions, ScrollView, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { useRoute, RouteProp } from '@react-navigation/native';
import Text from "~/components/Text";
import WebView from "~/components/Webview";
import { RootState } from "~/stores";
import FastImage from '@d11/react-native-fast-image';
import { Course } from '~/api/model';
import { getParticipantCourse } from '~/api/rest/courses';
import { HTMLWrapper } from '~/api/util';
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';


const connector = connect((state: RootState, ownProps: { route: { params: Record<string, any> } }) => {
    const enrolledCourse = state.course.enrolled.find(course => course.id === ownProps.route.params?.id);
    return {
        enrolled: !!enrolledCourse,
        courseId: ownProps.route.params?.id
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

export default connector(CourseInformation);