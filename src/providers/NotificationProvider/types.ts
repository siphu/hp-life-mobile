import { NavigationProp, NavigationState } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Notification as NotificationModel } from '~/api/endpoints';

export type RNNavigationProp = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  'getState'
> & { getState(): NavigationState | undefined };

export interface NotificationContextProps {
  hasPermission?: boolean;
  handleNotification: (notification: NotificationModel) => void;
  requestPermission: () => void;
  clearNotifications: () => void;
  deleteNotification: (notification: NotificationModel) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
  notifications: NotificationModel[];
  language: string;
  navigation: RNNavigationProp;
  preferencePushNotification?: boolean;
}

export interface NotificationProviderState {
  initialized: boolean;
  hasPermission?: boolean;
}
