import { TouchableOpacity, View } from 'react-native';
import { Course, Task as TaskModel } from '~/api/endpoints';
import {
  MaterialIcons,
  MaterialIconsOutlined,
  MaterialSymbolsOutlined,
} from '~/components/MaterialIcons';
import { Text } from '~/components/Text';
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';
import { styles } from '../styles';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { AuthenticatedScreens } from '~/navigation/screens';
import { DrawerActions } from '@react-navigation/native';

const icons = {
  checked: (
    <MaterialIcons
      name="check_circle"
      size={20}
      color={config.color.neutral[900]}
    />
  ),
  unchecked: (
    <MaterialIconsOutlined
      name="radio_button_unchecked"
      size={20}
      color={config.color.neutral[900]}
    />
  ),
  content: (
    <MaterialSymbolsOutlined
      name="draft"
      size={20}
      color={config.color.neutral[900]}
    />
  ),
  survey: (
    <MaterialSymbolsOutlined
      name="bar_chart"
      size={20}
      color={config.color.neutral[900]}
    />
  ),
};

export const Task = ({
  course,
  task,
  selected,
  navigation,
  enrolled,
}: {
  course: Course;
  task: TaskModel;
  selected: boolean;
  navigation: DrawerNavigationHelpers;
  enrolled: boolean;
}) => {
  const backgroundColor = selected ? config.color.misc.selected : undefined;
  const taskIcon = task.finishDate ? icons.checked : icons.unchecked;
  const typeIcon = task.type === 'Survey' ? icons.survey : icons.content;

  const ParentView = enrolled ? TouchableOpacity : View;

  return (
    <ParentView
      style={[
        GlobalStyles.flexRow,
        GlobalStyles.alignCenter,
        { gap: 4, paddingVertical: 8, paddingHorizontal: 20, backgroundColor },
      ]}
      onPress={() => {
        enrolled &&
          navigation.navigate(AuthenticatedScreens.CourseExecution, {
            courseId: course.id,
            taskId: task.id,
          });
      }}>
      {taskIcon}
      {typeIcon}
      <Text style={styles.taskName}>{task.name}</Text>
    </ParentView>
  );
};
