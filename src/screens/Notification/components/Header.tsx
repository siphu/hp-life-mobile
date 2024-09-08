import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '~/components/Text';
import { styles } from '../styles';
import { t } from '~/providers/TranslationProvider';

export const Header = React.memo(({ onClear }: { onClear: () => void }) => {
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onClear}
        style={styles.biggerTouchable}>
        <Text style={styles.clearAllText}>{t('notification.clearAll')}</Text>
      </TouchableOpacity>
    </View>
  );
});
