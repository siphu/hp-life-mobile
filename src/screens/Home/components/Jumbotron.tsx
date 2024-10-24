import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Course } from '~/api/endpoints';
import Text from '~/components/Text';
import { styles } from '../styles';
import { AvailableOffline } from './AvailableOffline';
import { RootState } from '~/stores';
import { Completed } from './Completed';
import { InProgress } from './InProgress';
import { AuthenticatedScreens } from '~/navigation/screens';
import { connect } from 'react-redux';

import FastImage from '@d11/react-native-fast-image';
import { t } from '~/providers/TranslationProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation';

interface JumbotronProps {
  course: Course;
  language: string;
  categories: RootState['course']['categories'];
  navigation: StackNavigationProp<
    RootStackParamList,
    AuthenticatedScreens.Home
  >;
  disabled?: boolean;
}

class Jumbotron extends React.PureComponent<JumbotronProps> {
  render() {
    const { course, language, categories, navigation } = this.props;

    const category = categories[language].find(
      c => c.id === course.categoryId,
    )?.name;
    const accessibilityText =
      '' +
      (category ? category + '; ' : '') +
      (course.name + '; ') +
      ((course.traineeEnrollmentStatus === 'Enrolled' ||
        course.enrollmentStatus === 'Enrolled') &&
      course.progress !== undefined &&
      course.progress >= 1
        ? t('courseWidget.completed') + '; '
        : '') +
      ((course.traineeEnrollmentStatus === 'Enrolled' ||
        course.enrollmentStatus === 'Enrolled') &&
      course.progress !== undefined &&
      course.progress < 1
        ? t('courseWidget.inProgress') + '; '
        : '') +
      (Array.isArray(course.books) && course.books.length > 0
        ? t('courseWidget.availableOffline')
        : '');

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={accessibilityText}
        accessibilityRole="button"
        onPress={() => {
          navigation.navigate(AuthenticatedScreens.CourseDrawer, {
            screen: AuthenticatedScreens.CourseInformation,
            params: { courseId: course.id },
          });
        }}>
        <View accessible={false}>
          <FastImage
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
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <View accessible={false}>
            <Text style={styles.titleText}>{course.name.trim()}</Text>
          </View>
          <View style={styles.buttonRowContainer}>
            {course.traineeEnrollmentStatus === 'Enrolled' &&
              course.progress !== undefined && (
                <View style={styles.progressExtraMargin}>
                  {course.progress >= 1 && <Completed />}
                  {course.progress < 1 && <InProgress />}
                </View>
              )}
            <View>
              {Array.isArray(course.books) && course.books.length > 0 && (
                <AvailableOffline />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// Map state to props
const mapStateToProps = (state: RootState) => ({
  language: state.app.language,
  categories: state.course.categories,
});

// Connect component to Redux store
export default connect(mapStateToProps)(Jumbotron);
