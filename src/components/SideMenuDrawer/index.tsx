import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "~/components//Text";
import { RootState } from "~/stores";
import { setLogin } from "~/stores/user/actions";

const SideMenuDrawer = (props: DrawerContentComponentProps) => {
    const userState = useSelector((root: RootState) => root.user);
    const dispatch = useDispatch();


    return (<View style={{
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'stretch',
    }}>
        <View><Text>Header goes here</Text></View>
        <View><Text>Side Menu Drawer</Text></View>
        <View style={{ flexGrow: 1 }} />
        <View><TouchableOpacity onPress={() => dispatch(setLogin())}><Text>Logout</Text></TouchableOpacity></View>
    </View>);
};

export default SideMenuDrawer;