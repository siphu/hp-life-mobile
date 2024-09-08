import { I18nManager, TouchableOpacity, View } from 'react-native';
import Text from '~/components/Text';
import Images from '~/res/images';
import { styles } from '../styles';
import { config } from '~/config/config';
import { t } from '~/providers/TranslationProvider';
import { MaterialIcons } from '~/components/MaterialIcons';

export const ProfileItem = ({
  name,
  click,
  disabled,
}: {
  name?: string;
  click: () => void;
  disabled?: boolean;
}) => {
  const userInitial =
    (name || '').trim().length > 0
      ? (name || '')
          .trim()
          .toUpperCase()
          .split(' ', 2)
          .map(c => c.charAt(0))
          .join('')
      : '';
  const ParentElement: typeof View | typeof TouchableOpacity = disabled
    ? View
    : TouchableOpacity;
  return (
    <ParentElement
      accessibilityRole="button"
      accessibilityLabel={t('sideMenu.manageAccount')}
      onPress={disabled ? undefined : click}
      style={styles.profileContainer}>
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <View style={styles.userInitialContainer} accessible={false}>
            <Text style={styles.userInitial} accessible={false}>
              {userInitial}
            </Text>
          </View>
          <View style={styles.profileColumn}>
            <Text style={styles.userName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {t('sideMenu.manageAccount')}
            </Text>
          </View>
          <View style={styles.profileArrowContainer}>
            <MaterialIcons
              name={I18nManager.isRTL ? 'chevron_left' : 'chevron_right'}
              color={config.color.neutral[disabled ? 400 : 900]}
              size={30}
            />
          </View>
        </View>
      </View>
    </ParentElement>
  );
};
