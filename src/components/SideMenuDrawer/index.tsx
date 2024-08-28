import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Text from "~/components//Text";
import { config } from "~/config/config";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";
import { styles } from "./styles";
import Images from '~/res/images';
import { ProfileItem } from "./components/ProfileItem";
import { AuthenticatedScreens } from '~/navigation/screens'
import { setToken } from "~/stores/user/actions";
import MenuItem, { MenuItemProps } from "./components/MenuItem";
import { MaterialIcons } from "~/components/MaterialIcons";
import Alert from "../Alert";
import React from "react";
import Button from "../Button";
import { t } from "~/providers/TranslationProvider";
import { signOut } from "~/api/helpers";

const SideMenuDrawer = ({ state, navigation }: DrawerContentComponentProps) => {
    const userState = useSelector((root: RootState) => root.user);
    const appState = useSelector((root: RootState) => root.app);
    const [showLogout, setShowLogout] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    const menu: MenuItemProps[] = [
        {
            label: t('sideMenu.certificate'),
            icon: 'verified',
            selected: false,
            click: () => {
                navigation.navigate(AuthenticatedScreens.Dashboard, {
                    category: 'myCourse.completed',
                });
            },
            disabled: !appState.online
        },
        {
            label: t('sideMenu.badges'),
            icon: 'workspace_premium',
            selected: false,
            click: () => {
                navigation.navigate(AuthenticatedScreens.Dashboard, {
                    category: 'myCourse.badges',
                });
            },
            disabled: !appState.online
        },
    ].filter(m => m !== undefined) as MenuItemProps[];


    const browseInApp = (item: any) => {
        navigation.navigate(AuthenticatedScreens.InAppBrowser, {
            title: item.title,
            url: item.url,
            locale: appState.language
        });
    };

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
                            <MaterialIcons name="close" size={24} color={config.color.neutral[900]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView
                accessible={false}
                accessibilityRole="menu"
                style={GlobalStyles.flex}
                showsVerticalScrollIndicator={false}>
                <ProfileItem disabled={!appState.online} name={userState.profile?.fullName} click={() => navigation.navigate(AuthenticatedScreens.Profile)} />
                {menu.map((m, i) => (
                    <MenuItem {...m} key={'menu_' + i.toString()} />
                ))}
                {config.externalLinks.map((m: any, i) => (
                    <MenuItem
                        label={t(m.title)}
                        icon={m.icon}
                        key={'external_' + i.toString()}
                        click={() => {
                            browseInApp({
                                title: t(m.title),
                                url: m.url,
                            });
                        }}
                        disabled={!appState.online}
                    />
                ))}
            </ScrollView>
            <View>
                <Alert show={showLogout} position="Bottom" onRequestClose={() => setShowLogout(false)}>
                    <View style={{
                        rowGap: 12,
                    }}>
                        <View><Text style={{
                            fontSize: 28,
                            fontWeight: 500,
                        }}>{t('sideMenu.logout.label')}</Text></View>
                        <View>
                            <Text style={{
                                fontSize: 16,
                            }}>{t('sideMenu.logout.prompt')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 12 }}>
                            <Button title={t('sideMenu.logout.cancel')} color={config.color.button.primary} style={{
                                paddingHorizontal: 20,
                            }} onPress={() => setShowLogout(false)}></Button>
                            <Button onPress={() => { signOut() }} title={t('sideMenu.logout.yes')} color={config.color.misc.danger} style={{
                                paddingHorizontal: 20,
                            }}></Button>
                        </View>
                    </View>
                </Alert>
                <TouchableOpacity style={styles.logoutContainer} onPress={() => setShowLogout(true)} accessibilityRole='button'>
                    <MaterialIcons style={styles.linkIcon} name={'logout'} size={24} color={config.color.neutral[900]} />
                    <Text style={styles.rowText}>
                        {t('sideMenu.logout.label')}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.hpFoundationContainer}>
                <Images.logo.foundation
                    height={60}
                    style={{ aspectRatio: 125 / 59 }}
                    fill={config.color.neutral[50]}
                />
                <View>
                    <Text style={styles.hpFoundationText}>
                        {t('sideMenu.hpFoundation')}
                    </Text>
                </View>
            </View>
            <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea} />
        </View>);
};

export default SideMenuDrawer;