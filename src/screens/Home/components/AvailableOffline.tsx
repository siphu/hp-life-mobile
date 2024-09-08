import { View } from 'react-native';
import Text from '~/components/Text';
import { styles } from '../styles';
import { config } from '~/config/config';
import { t } from '~/providers/TranslationProvider';
import { MaterialIcons } from '~/components/MaterialIcons';

export const AvailableOffline = () => {
  return (
    <View style={styles.tagAvailableOffline}>
      <MaterialIcons
        name="cloud_download"
        size={12}
        style={styles.cloudImageContainer}
        color={config.color.neutral[900]}
      />
      <Text
        style={styles.tagText}
        accessibilityLabel={t('courseWidget.availableOffline')}>
        {t('courseWidget.availableOffline')}
      </Text>
    </View>
  );
};
