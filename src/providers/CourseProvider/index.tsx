import React, { createContext } from 'react';
import { CourseContextType, CourseProviderProps, CourseProviderState, RNNavigationProp } from './types';
import { RootState } from '~/stores';
import { NavigationProp, NavigationState, RouteProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';
import Loader from '~/components/Loader';
import { getAvailableCourses, getEnrolledCourses } from '~/api/helpers';
import { getParticipantCourse, getParticipantLessons, getTraineeCourse } from '~/api/endpoints';


export const CourseContext = createContext<CourseContextType>({} as CourseContextType);

export class CourseProvider extends React.Component<CourseProviderProps, CourseProviderState> {

  constructor(props: CourseProviderProps) {
    super(props);
    const courseId = (this.props.params as Record<string, any>)?.courseId as number;

    this.state = {
      enrolled: !!this.props.enrolled.find(e => e.id === courseId)
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(force?: boolean) {
    const courseId = (this.props.params as Record<string, any>)?.courseId as number;
    const requestedTaskId = (this.props.params as Record<string, any>)?.taskId as number | undefined;

    const taskId = requestedTaskId || this.state.task?.id;

    let enrolled = !!this.props.enrolled.find(e => e.id === courseId);
    let isEnrolled = enrolled;

    if (force) {
      const newEnrolledCourses = await getEnrolledCourses(true);
      isEnrolled = newEnrolledCourses.some(c => c.id === courseId);

      if (!enrolled && isEnrolled) {
        getAvailableCourses(true);
      }
    }

    if (isEnrolled) {
      const course = await getTraineeCourse(courseId);
      const allTasks = course.lessons?.flatMap(lesson => lesson.tasks) || [];
      const foundTask = allTasks.find(t => t.id === taskId);
      this.setState({
        course: course,
        task: foundTask,
        enrolled: true
      });

    } else {
      const [c, l] = await Promise.all([getParticipantCourse(courseId), getParticipantLessons(courseId)]);
      this.setState({
        course: { ...c, lessons: l },
        task: undefined,
        enrolled: false
      });
    }

  }

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(prevProps: Readonly<CourseProviderProps>, prevState: Readonly<CourseProviderState>, snapshot?: any): void {

  }

  shouldComponentUpdate(nextProps: Readonly<CourseProviderProps>, nextState: Readonly<CourseProviderState>, nextContext: any): boolean {

    const shouldUpdate =
      this.state.course !== nextState.course
      || this.state.task !== nextState.task
      ;

    if (nextState.course) {
      const nextTaskId = nextProps.params?.taskId;
      const previousTaskId = this.props.params?.taskId;
      const nextScreen = nextProps.screen;
      const allTasks = nextState.course.lessons?.flatMap(lesson => lesson.tasks);

      if (nextScreen === AuthenticatedScreens.CourseExecution && !nextTaskId && !nextState.task) {
        this.setState({
          task: allTasks && allTasks.length > 0 ? allTasks[0] : undefined
        });
      } else if (previousTaskId !== nextTaskId && this.state.task?.id !== nextTaskId) {
        this.setState({
          task: allTasks?.find(t => t.id === nextTaskId)
        })
      }
    }

    return shouldUpdate;
  }


  render() {
    const { children } = this.props;
    return (
      <CourseContext.Provider value={{
        course: this.state.course,
        task: this.state.task,
        enrolled: this.state.enrolled,
        update: this.fetchData
      }}>
        <Loader visible={!this.state.course} />
        {children}
      </CourseContext.Provider>
    );
  }
}


const getRouteParams = (navigation: RNNavigationProp) => {
  const state = navigation.getState();

  if (state?.routes) {
    const courseDrawerRoute = state.routes.find(r => r.name === AuthenticatedScreens.CourseDrawer);

    const courseStackRoute = courseDrawerRoute?.state?.routes.find(r => r.name === AuthenticatedScreens.CourseScreenStack);

    if (courseStackRoute?.state?.routes) {
      const routeIndex = courseStackRoute.state.index;
      if (routeIndex) {
        const routeName = courseStackRoute.state.routeNames?.[routeIndex];
        const currentRoute = courseStackRoute.state.routes.find(r => r.name === routeName);
        if (currentRoute?.params) {
          return {
            name: routeName,
            params: currentRoute.params
          }
        }
      }
    }
    if (courseDrawerRoute?.params)
      return {
        name: (courseDrawerRoute.params as Record<string, any>).screen,
        params: (courseDrawerRoute.params as Record<string, any>).params,
      };
  }
  return undefined;
};

const mapStateToProps = (state: RootState, ownProps: { navigation: RNNavigationProp; route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseDrawer> }) => {
  const routeParams = getRouteParams(ownProps.navigation);
  return {
    enrolled: state.course.enrolled,
    route: ownProps.route,
    screen: routeParams?.name,
    params: routeParams?.params as Record<string, any>
  };
};

export default connect(mapStateToProps)(CourseProvider);
export const useCourseProviderContext = (): CourseContextType => {
  return React.useContext(CourseContext);
};
