import { Image, TouchableOpacity, View } from "react-native";
import { Course } from "~/api/model";
import Text from "~/components/Text";
import { styles } from "../styles";
import { AvailableOffline } from "./AvailableOffline";
import { useSelector } from "react-redux";
import { RootState } from "~/stores";
import { Completed } from "./Completed";
import { InProgress } from "./InProgress";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedScreens } from "~/navigation/screens";
import { t } from "~/translations";
import React from "react";

const Jumbotron = ({ course }: { course: Course }) => {

    const language = useSelector((root: RootState) => root.app.language) || 'en';
    const { categories } = useSelector((root: RootState) => root.course);
    const navigation = useNavigation();

    const category = categories[language].find(c => c.id === course.categoryId)?.name;
    let accessibilityText =
        '' +
        (category ? category + '; ' : '') +
        (course.name + '; ') +
        ((course.traineeEnrollmentStatus === 'Enrolled' || course.enrollmentStatus === 'Enrolled') &&
            course.progress !== undefined &&
            course.progress >= 1
            ? t('courseWidget.completed') + '; ' : '') +
        ((course.traineeEnrollmentStatus === 'Enrolled' || course.enrollmentStatus === 'Enrolled') &&
            course.progress !== undefined &&
            course.progress < 1
            ? t('courseWidget.inProgress') + '; ' : '') +
        (Array.isArray(course.books) && course.books.length > 0 ? t('courseWidget.availableOffline') : '');


    return (
        <TouchableOpacity
            accessible={true}
            accessibilityLabel={accessibilityText}
            accessibilityRole='button'
            onPress={() => { navigation.navigate(AuthenticatedScreens.CourseInformation, { id: course.id }) }}
        >
            <View accessible={false}>
                <Image
                    style={styles.backgroundImage}
                    accessibilityElementsHidden={true}
                    source={{
                        uri: course.imageUrl,
                    }}
                    resizeMode={'cover'}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{categories[language].find(c => c.id === course.categoryId)?.name}</Text>
                </View>
                <View accessible={false}>
                    <Text style={styles.titleText}>{course.name.trim()}</Text>
                </View>
                <View style={styles.buttonRowContainer}>
                    {course.progress !== undefined && (
                        <View style={styles.progressExtraMargin}>
                            {course.progress >= 1 && (<Completed />)}
                            {course.progress < 1 && (<InProgress />)}
                        </View>
                    )}
                    <View>
                        {Array.isArray(course.books) && course.books.length > 0 && (<AvailableOffline />)}
                    </View>
                </View>

            </View>
        </TouchableOpacity >
    )
}

// Memoize the component
export default React.memo(Jumbotron, (prevProps, nextProps) => {
    // Custom comparison function to prevent re-renders if the course prop hasn't changed
    return prevProps.course === nextProps.course;
});