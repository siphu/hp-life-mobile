import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";
import { RootState } from "~/stores";
import { AuthenticatedStack } from './AuthenticatedStack';
import React from "react";

/** This fixes the navigation.navigate() as never */
export type RootStackParamList = { [key: string]: any };
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList { }
  }
}

const connector = connect((state: RootState) => ({
  token: state.user.token,
}));
const NavigationSwitch: React.FC<ConnectedProps<typeof connector>> = ({ token }) => {
  return token ? <AuthenticatedStack /> : <UnAuthenticatedStack />;
};

export const NavigationStacks = connector(NavigationSwitch);