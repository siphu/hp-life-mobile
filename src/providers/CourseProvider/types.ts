import {
  NavigationProp,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import { Course, Task, TaskDetail, TraineeCourse } from '~/api/endpoints';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';

export type RNNavigationProp = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  'getState'
> & { getState(): NavigationState | undefined };

export interface CourseContextType {
  course?: Course;
  task?: Task;
  taskDetail?: TaskDetail;
  enrolled: boolean;
  update: (force?: boolean) => Promise<void>;
}

export interface CourseProviderProps {
  children: React.ReactNode;
  navigation: RNNavigationProp;
  route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseDrawer>;
  enrolled: TraineeCourse[];
  screen?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>;
}

export interface CourseProviderState {
  course?: Course;
  task?: Task;
  taskDetail?: TaskDetail;
  enrolled: boolean;
}
