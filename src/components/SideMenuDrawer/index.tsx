import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Text from '~/components//Text';
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';
import { RootState } from '~/stores';
import { styles } from './styles';
import Images from '~/res/images';
import { ProfileItem } from './components/ProfileItem';
import { AuthenticatedScreens } from '~/navigation/screens';
import MenuItem, { MenuItemProps } from './components/MenuItem';
import { MaterialIcons } from '~/components/MaterialIcons';
import React from 'react';
import { t } from '~/providers/TranslationProvider';
import { Logout } from './components/Logout';
import { TranslationsPaths } from '~/translations';

const SideMenuDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const userState = useSelector((root: RootState) => root.user);
  const appState = useSelector((root: RootState) => root.app);

  const menu: MenuItemProps[] = [
    {
      label: t('sideMenu.links.help'),
      icon: 'help_outline',
      selected: false,
      click: () => {
        browseInApp({
          title: t('sideMenu.links.help'),
          url: `${config.api.webUrl}/mobile/help`,
        });
      },
      disabled: !appState.online,
    },
    {
      label: t('sideMenu.certificate'),
      icon: 'verified',
      selected: false,
      click: () => {
        navigation.navigate(AuthenticatedScreens.Dashboard, {
          category: 'myCourse.completed',
        });
      },
      disabled: !appState.online,
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
      disabled: !appState.online,
    },
  ].filter(m => m !== undefined) as MenuItemProps[];

  const browseInApp = (item: Record<string, string>) => {
    navigation.navigate(AuthenticatedScreens.InAppBrowser, {
      title: item.title,
      url: item.url,
      locale: appState.language,
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
              accessibilityRole="button"
              onPress={navigation.closeDrawer}>
              <MaterialIcons
                name="close"
                size={24}
                color={config.color.neutral[900]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        accessible={false}
        accessibilityRole="menu"
        style={GlobalStyles.flex}
        showsVerticalScrollIndicator={false}>
        <ProfileItem
          disabled={!appState.online}
          name={userState.profile?.fullName}
          click={() => navigation.navigate(AuthenticatedScreens.Profile)}
        />
        {menu.map((m, i) => (
          <MenuItem {...m} key={'menu_' + i.toString()} />
        ))}
        {config.externalLinks.map((m, i) => (
          <MenuItem
            label={t(m.title as TranslationsPaths)}
            icon={m.icon}
            key={'external_' + i.toString()}
            click={() => {
              browseInApp({
                title: t(m.title as TranslationsPaths),
                url: m.url,
              });
            }}
            disabled={!appState.online}
          />
        ))}
      </ScrollView>
      <Logout />
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
    </View>
  );
};

export default SideMenuDrawer;
