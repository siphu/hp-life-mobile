import { ScrollView } from 'react-native';
import { GlobalStyles } from '~/config/styles';
import { useCourseProviderContext } from '~/providers/CourseProvider';
import React from 'react';
import { OrientationLocker } from 'react-native-orientation-locker';
import { ContentTask } from './components/ContentTask';
import { Task, TaskDetail, TaskType } from '~/api/endpoints';
import { SurveyTask } from './components/SurveyTask';

// interface Props {
//   route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseExecution>;
//   navigation: StackNavigationProp<
//     RootStackParamList,
//     AuthenticatedScreens.CourseExecution,
//     undefined
//   >;
// }

const ContentSwitcher = ({
  task,
  detail,
}: {
  task: Task;
  detail: TaskDetail;
}) => {
  switch (task.type) {
    case TaskType.Content:
      return <ContentTask taskDetail={detail} />;
    case TaskType.Survey:
    case TaskType.Quiz:
    case TaskType.EditableForm:
      return <SurveyTask taskDetail={detail} />;
    default:
      console.info('[Unknown Task Type]', task.type);
      return null;
  }
};

const CourseExecution = () => {
  const { task, taskDetail } = useCourseProviderContext();
  return (
    <ScrollView
      style={GlobalStyles.screenContainer}
      contentContainerStyle={GlobalStyles.screenContainer}>
      <OrientationLocker orientation={'UNLOCK'} />
      {React.useMemo(
        () =>
          task &&
          taskDetail && <ContentSwitcher task={task} detail={taskDetail} />,
        [task, taskDetail],
      )}
    </ScrollView>
  );
};

export default CourseExecution;
