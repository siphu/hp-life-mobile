import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Text from "~/components//Text";
import { config } from "~/config/config";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from '~/res/images';
import { ProfileItem } from "./components/ProfileItem";
import { AuthenticatedScreens } from "~/navigations/screens";
import { setToken } from "~/stores/user/actions";

const SideMenuDrawer = (props: DrawerContentComponentProps) => {
    const userState = useSelector((root: RootState) => root.user);
    const dispatch = useDispatch();
    return (
        <View style={GlobalStyles.flex}>
            <SafeAreaView edges={['top']} style={styles.topSafeArea} />
            <View>
                <View style={styles.topHeader}>
                    <View style={styles.hpLogoContainer} accessible={false}>
                        <Images.logo.white width={80} height={'90%'} />
                    </View>
                    <View>
                        <TouchableOpacity
                            accessibilityRole='button'
                            onPress={props.navigation.closeDrawer}>
                            <Icon name="close" size={24} color={config.color.neutral[900]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView
                accessible={false}
                accessibilityRole="menu"
                style={GlobalStyles.flex}
                showsVerticalScrollIndicator={false}>
                <ProfileItem disabled={false} name={userState.profile?.fullName} click={() => props.navigation.navigate(AuthenticatedScreens.Profile)} />

            </ScrollView>
            <View style={{ flexGrow: 1 }} />
            <View><TouchableOpacity onPress={() => dispatch(setToken())}><Text>Logout</Text></TouchableOpacity></View>
            <SafeAreaView edges={['bottom']} />
        </View>);
};

export default SideMenuDrawer;