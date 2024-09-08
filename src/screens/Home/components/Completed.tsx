import {View} from 'react-native';
import Text from '~/components/Text';
import {styles} from '../styles';
import {t} from '~/providers/TranslationProvider';

export const Completed = () => {
  return (
    <View style={styles.tagCompleted}>
      <Text
        style={styles.tagText}
        accessibilityLabel={t('courseWidget.completed')}>
        {t('courseWidget.completed')}
      </Text>
    </View>
  );
};
