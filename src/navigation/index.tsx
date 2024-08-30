import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";
import { RootState, stores } from "~/stores";
import { AuthenticatedStack } from './AuthenticatedStack';
import React from "react";
import NotificationProvider from "~/providers/NotificationProvider";
import { NavigationProp, NavigationState, useNavigation } from "@react-navigation/native";
import { AuthenticatedScreens } from "./screens";
import { Course } from "~/api/endpoints";

export type RootStackParamList = {
  [AuthenticatedScreens.CourseDetail]: {
    courseId: number;
    course: Course;
    enrolled: boolean;
  };
  [AuthenticatedScreens.CourseExecution]: {
    courseId: number;
    course: Course;
    enrolled: boolean;
  };
  [AuthenticatedScreens.CourseInformation]: { id: number };
  [AuthenticatedScreens.InAppBrowser]: { locale: string; title?: string };
  [key: string]: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const connector = connect((state: RootState) => ({ token: state.user.token, }));
const NavigationSwitch: React.FC<ConnectedProps<typeof connector>> = ({ token }) => {
  const navigation = useNavigation();
  return token ? <NotificationProvider navigation={navigation}><AuthenticatedStack /></NotificationProvider> : <UnAuthenticatedStack />;
};

export const NavigationStacks = connector(NavigationSwitch);