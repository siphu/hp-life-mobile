import { connect, ConnectedProps } from "react-redux";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";
import { RootState } from "~/stores";
import { AuthenticatedStack } from './AuthenticatedStack';
import React from "react";
import NotificationProvider from "~/providers/NotificationProvider";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedScreens } from "./screens";
export type RootStackParamList = {
  [AuthenticatedScreens.CourseInformation]: { id: number, ts?: string }; //ts forces a refresh
  [AuthenticatedScreens.InAppBrowser]: { locale: string; title?: string, url?: string; };
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
  return token ?
    <NotificationProvider navigation={navigation}>
      <AuthenticatedStack />
    </NotificationProvider>
    : <UnAuthenticatedStack />;
};
export const NavigationStacks = connector(NavigationSwitch);