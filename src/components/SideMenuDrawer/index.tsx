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
import { AuthenticatedScreens } from '~/navigation/screens'
import { setToken } from "~/stores/user/actions";
import { t } from "~/translations";
import MenuItem, { MenuItemProps } from "./components/MenuItem";


const SideMenuDrawer = ({ state, navigation }: DrawerContentComponentProps) => {
    const userState = useSelector((root: RootState) => root.user);
    const dispatch = useDispatch();


    const menu: MenuItemProps[] = [
        {
            label: t('sideMenu.certificate'),
            icon: Images.sideMenu.menuCertificate,
            selected: false,
            click: () => {

            },
            disabled: false
        },
        {
            label: t('sideMenu.badges'),
            icon: Images.sideMenu.menuBadge,
            selected: false,
            click: () => {

            },
            disabled: false
        },
    ].filter(m => m !== undefined) as MenuItemProps[];


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
                            onPress={navigation.closeDrawer}>
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
                <ProfileItem disabled={false} name={userState.profile?.fullName} click={() => navigation.navigate(AuthenticatedScreens.Profile)} />
                {menu.map((m, i) => (
                    <MenuItem {...m} key={'menu_' + i.toString()} />
                ))}
            </ScrollView>
            <View style={{ flexGrow: 1 }} />
            <View><TouchableOpacity onPress={() => dispatch(setToken())}><Text>Logout</Text></TouchableOpacity></View>
            <SafeAreaView edges={['bottom']} />
        </View>);
};

export default SideMenuDrawer;