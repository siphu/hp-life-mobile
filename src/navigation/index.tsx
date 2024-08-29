import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";
import { RootState, stores } from "~/stores";
import { AuthenticatedStack } from './AuthenticatedStack';
import React from "react";
import NotificationProvider from "~/providers/NotificationProvider";
import { useNavigation } from "@react-navigation/native";

/** This fixes the navigation.navigate() as never */
export type RootStackParamList = { [key: string]: any };
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList { }
  }
}

const connector = connect((state: RootState) => ({ token: state.user.token, }));
const NavigationSwitch: React.FC<ConnectedProps<typeof connector>> = ({ token }) => {
  const navigation = useNavigation();
  return token ? <NotificationProvider navigation={navigation}><AuthenticatedStack /></NotificationProvider> : <UnAuthenticatedStack />;
};

export const NavigationStacks = connector(NavigationSwitch);