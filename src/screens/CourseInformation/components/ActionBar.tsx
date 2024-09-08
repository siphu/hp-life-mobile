import { View } from 'react-native';
import { Course, CourseStatus, TraineeCourse } from '~/api/endpoints';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { config } from '~/config/config';
import { t } from '~/providers/TranslationProvider';
import { styles } from '../styles';
import { MaterialSymbolsOutlined } from '~/components/MaterialIcons';
import { DownloadBookButton } from './DownloadBookButton';
import EnrolledInformation from './EnrolledInformation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';

export const ActionBar = ({
  course,
  enrolled,
  navigation,
}: {
  course: Course | TraineeCourse;
  enrolled: boolean;
  navigation: StackNavigationProp<
    RootStackParamList,
    AuthenticatedScreens.CourseDetail,
    undefined
  >;
}) => {
  return (
    <View
      style={{
        backgroundColor: config.color.misc.border,
        padding: 20,
        rowGap: 12,
      }}>
      <Text>{course.description}</Text>
      {course.hasCertificate && (
        <View>
          <Text style={styles.courseActionTextRow}>
            {'\u2022  ' + t('courseInformation.courseCertificate')}
          </Text>
        </View>
      )}
      {course.status !== CourseStatus.Archived && !enrolled && (
        <Button
          variant="Primary"
          title={t('courseInformation.enrollCourse')}
          onPress={() => {}}
        />
      )}
      {course.status !== CourseStatus.Archived &&
        enrolled &&
        !(course as TraineeCourse).certificateId && (
          <Button
            variant="Primary"
            title={t(
              !course.progress || course.progress === 0
                ? 'courseInformation.startCourse'
                : 'courseInformation.continueCourse',
            )}
            onPress={() =>
              navigation.navigate(AuthenticatedScreens.CourseExecution, {
                courseId: course.id,
              })
            }
          />
        )}
      {enrolled && (course as TraineeCourse).certificateId && (
        <Button
          variant="Primary"
          title={t('courseInformation.viewCertificate')}
          onPress={() => {}}
        />
      )}
      {enrolled &&
        course.books &&
        Array.isArray(course.books) &&
        course.books.length > 0 && (
          <DownloadBookButton
            course={course as TraineeCourse}
            lessons={course.lessons}
            book={course.books[0]}
          />
        )}
      {course.status !== CourseStatus.Archived && enrolled && (
        <EnrolledInformation course={course as TraineeCourse} />
      )}
    </View>
  );
};
