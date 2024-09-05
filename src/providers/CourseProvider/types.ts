import {
  NavigationProp,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import {
  Content,
  Course,
  EditableForm,
  Meeting,
  Quiz,
  Survey,
  Task,
  TraineeCourse,
} from '~/api/endpoints';
import {RootStackParamList} from '~/navigation';
import {AuthenticatedScreens} from '~/navigation/screens';

type TaskDetail = Content | Quiz | Survey | Meeting | EditableForm;

export type RNNavigationProp = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  'getState'
> & {getState(): NavigationState | undefined};

export interface CourseContextType {
  course?: Course;
  task?: Task;
  taskDetail?: TaskDetail;
  enrolled: boolean;
  update: (force?: boolean) => Promise<void>;
  fetching: boolean;
}

export interface CourseProviderProps {
  children: React.ReactNode;
  navigation: RNNavigationProp;
  route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseDrawer>;
  enrolled: TraineeCourse[];
  screen?: string;
  params: Record<string, any>;
}

export interface CourseProviderState {
  course?: Course;
  task?: Task;
  taskDetail?: TaskDetail;
  enrolled: boolean;
  fetching: boolean;
}
