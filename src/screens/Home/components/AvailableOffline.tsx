import { View } from "react-native"
import Text from "~/components/Text"
import Images from '~/res/images';
import { styles } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { config } from "~/config/config";
import { t } from "~/providers/TranslationProvider";

export const AvailableOffline = () => {
    return (
        <View style={styles.tagAvailableOffline}>
            <MaterialIcons name="cloud" size={12} style={styles.cloudImageContainer} color={config.color.neutral[900]} />
            <Text style={styles.tagText} accessibilityLabel={t('courseWidget.availableOffline')}>{t('courseWidget.availableOffline')}</Text>
        </View>
    );
}