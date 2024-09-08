import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import SideMenuDrawer from '~/components/SideMenuDrawer';

export const DrawerContentWrapper = (props: DrawerContentComponentProps) => (
  <View style={{ paddingTop: 0, flex: 1, backgroundColor: 'white' }}>
    <SideMenuDrawer {...props} />
  </View>
);
