import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { GlobalStyles } from '~/config/styles';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';
import { useCourseProviderContext } from '~/providers/CourseProvider';
import React from 'react';
import { OrientationLocker } from 'react-native-orientation-locker';
import { ContentTask } from './components/ContentTask';
import { Task, TaskDetail, TaskType } from '~/api/endpoints';
import { SurveyTask } from './components/SurveyTask';

interface Props {
  route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseExecution>;
  navigation: StackNavigationProp<
    RootStackParamList,
    AuthenticatedScreens.CourseExecution,
    undefined
  >;
}

const ContentSwitcher = ({
  task,
  detail,
}: {
  task: Task;
  detail: TaskDetail;
}) => {
  switch (task.type) {
    case TaskType.Content:
      return React.useMemo(
        () => <ContentTask taskDetail={detail} />,
        [detail.id],
      );
    case TaskType.Survey:
    case TaskType.Quiz:
    case TaskType.EditableForm:
      return React.useMemo(
        () => <SurveyTask taskDetail={detail} />,
        [detail.id],
      );
    default:
      console.info('[Unknown Task Type]', task.type);
      return null;
  }
};

const CourseExecution = (_: Props) => {
  const { course, task, taskDetail, fetching } = useCourseProviderContext();
  return (
    <ScrollView
      style={GlobalStyles.screenContainer}
      contentContainerStyle={GlobalStyles.screenContainer}>
      <OrientationLocker orientation={'UNLOCK'} />
      {task && taskDetail && (
        <ContentSwitcher task={task} detail={taskDetail} />
      )}
    </ScrollView>
  );
};

export default CourseExecution;
