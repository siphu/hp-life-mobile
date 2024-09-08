import Text from '~/components/Text';
import { Course } from '~/api/endpoints';
import { GlobalStyles } from '~/config/styles';
import { View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { styles } from '../styles';

export const Information = ({ course }: { course: Course }) => {
  return (
    <View
      style={[
        GlobalStyles.flexRow,
        GlobalStyles.alignCenter,
        { padding: 20, columnGap: 20 },
      ]}>
      <FastImage source={{ uri: course.imageUrl }} style={styles.courseImage} />
      <View style={GlobalStyles.flex}>
        <Text style={styles.courseName}>{course.name}</Text>
      </View>
    </View>
  );
};
