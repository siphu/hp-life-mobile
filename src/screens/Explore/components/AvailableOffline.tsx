import { View } from "react-native"
import Text from "~/components/Text"
import { styles } from "../styles";
import { t } from "i18next";
import { MaterialIcons } from "~/components/MaterialIcons";
import { config } from "~/config/config";

export const AvailableOffline = () => {
    return (
        <View style={styles.tagAvailableOffline}>
            <MaterialIcons name="cloud_download" size={12} style={styles.cloudImageContainer} color={config.color.neutral[900]} />
            <Text style={styles.tagText}>{t('courseWidget.availableOffline')}</Text>
        </View>
    );
}