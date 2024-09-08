import {View} from 'react-native';
import Text from '~/components/Text';
import {styles} from '../styles';
import {t} from '~/providers/TranslationProvider';

export const InProgress = () => {
  return (
    <View style={styles.tagInProgress}>
      <Text
        style={styles.tagText}
        accessibilityLabel={t('courseWidget.inProgress')}>
        {t('courseWidget.inProgress')}
      </Text>
    </View>
  );
};
