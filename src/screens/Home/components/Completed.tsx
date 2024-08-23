import { View } from "react-native"
import Text from "~/components/Text"
import { t } from "~/translations";
import { styles } from "../styles";
export const Completed = () => {
    return (
        <View style={styles.tagCompleted}>
            <Text style={styles.tagText} accessibilityLabel={t('courseWidget.completed')}>{t('courseWidget.completed')}</Text>
        </View>
    );
}