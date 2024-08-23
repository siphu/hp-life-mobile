import { View } from "react-native"
import Text from "~/components/Text"
import { t } from "~/translations";
import { styles } from "../styles";

export const InProgress = () => {
    return (
        <View style={styles.tagInProgress}>
            <Text style={styles.tagText} accessibilityLabel={t('courseWidget.inProgress')}>{t('courseWidget.inProgress')}</Text>
        </View>
    );
}