import { connect, ConnectedProps } from 'react-redux';
import { UnAuthenticatedStack } from './UnAuthenticatedStack';
import { RootState } from '~/stores';
import { AuthenticatedStack } from './AuthenticatedStack';
import React from 'react';
import NotificationProvider from '~/providers/NotificationProvider';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedScreens } from './screens';
import { TraineeCourse } from '~/api/endpoints';
import Loader from '~/components/Loader';
export type RootStackParamList = {
  [AuthenticatedScreens.CourseInformation]: {
    courseId: number;
    taskId?: number;
  };
  [AuthenticatedScreens.InAppBrowser]: {
    locale: string;
    title?: string;
    url?: string;
  };
  [AuthenticatedScreens.CourseExecution]: { courseId: number; taskId?: number };
  [key: string]: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const connector = connect((state: RootState) => ({
  token: state.user.token,
  loader: state.app.loader,
}));
const NavigationSwitch: React.FC<ConnectedProps<typeof connector>> = ({
  token,
  loader,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <Loader visible={loader} />
      {token ? (
        <NotificationProvider navigation={navigation}>
          <AuthenticatedStack />
        </NotificationProvider>
      ) : (
        <UnAuthenticatedStack />
      )}
    </>
  );
};
export const NavigationStacks = connector(NavigationSwitch);
