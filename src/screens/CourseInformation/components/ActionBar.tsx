import { View } from "react-native";
import { Course } from "~/api/endpoints";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { config } from "~/config/config";
import { t } from "~/providers/TranslationProvider";
import { styles } from "../styles";
import { MaterialSymbolsOutlined } from "~/components/MaterialIcons";

export const ActionBar = ({ course, enrolled }: { course: Course; enrolled: boolean }) => {
    return (
        <View style={{ backgroundColor: config.color.misc.border, padding: 20, rowGap: 12 }}>
            <Text>{course.description}</Text>
            <Button color={config.color.neutral[900]}
                title={t('courseInformation.enrollCourse')} onPress={() => { }}
            />
            <Text>Is Enrolled: {enrolled.toString()}</Text>
            {course.hasCertificate && (
                <View>
                    <Text style={styles.courseActionTextRow}>
                        {'\u2022  ' + t('courseInformation.courseCertificate')}
                    </Text>
                </View>
            )}
        </View>
    )
}