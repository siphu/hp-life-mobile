import { TraineeCourse } from '~/api/endpoints';
import * as Progress from 'react-native-progress';
import { config } from '~/config/config';
import { View } from 'react-native';
import Text from '~/components/Text';
import { styles } from '../styles';
import { t } from '~/providers/TranslationProvider';
import { friendlyDate } from '~/utils';
import moment from 'moment';

export default ({ course }: { course: TraineeCourse }) => {
  return (
    <View style={styles.rowGap}>
      <Progress.Bar
        progress={course.progress || 0}
        color={config.color.neutral[900]}
        unfilledColor={config.color.neutral[50]}
        useNativeDriver={true}
        borderWidth={0}
        width={null}
        borderRadius={0}
      />
      <Text style={styles.courseActionPercentText}>
        {((course.progress || 0) * 100).toFixed(0)}%{' '}
        {t('courseInformation.percentCompleted')}
      </Text>
      <View>
        {!course.finishDate && (
          <Text style={styles.courseActionDateText}>
            {t('courseInformation.startedDate')}:{' '}
            {course.startDate
              ? friendlyDate(moment(course.startDate))
              : t('courseInformation.neverDate')}
          </Text>
        )}
        {course.finishDate && (
          <Text>
            {t('courseInformation.finishDate')}:{' '}
            {friendlyDate(moment(course.finishDate))}
          </Text>
        )}
      </View>
    </View>
  );
};
