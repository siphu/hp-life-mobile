import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native";
import { ScrollViewBackgroundLayer } from "~/components/ScrollViewBackgroundLayer";
import SideMenuDrawer from "~/components/SideMenuDrawer";
import { GlobalStyles } from "~/config/styles";

export const DrawerContentWrapper = (props: DrawerContentComponentProps) =>
    <View style={{ paddingTop: 0, flex: 1, backgroundColor: 'white' }}>
        <SideMenuDrawer {...props} />
    </View>;