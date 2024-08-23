import I18n from 'react-native-i18n';
import { useSelector } from "react-redux";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";
import { RootState } from "~/stores";
import { AuthenticatedStack } from './AuthenticatedStack';

/** This fixes the navigation.navigate() as never */
export type RootStackParamList = { [key: string]: any };
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList { }
  }
}

export const NavigationStacks = () => {
  const appState = useSelector((state: RootState) => state.app);
  const userState = useSelector((state: RootState) => state.user);
  if (appState.language) I18n.locale = appState.language;
  return userState.token ? <AuthenticatedStack /> : <UnAuthenticatedStack />;
}