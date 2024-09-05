import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { MaterialIcons } from "~/components/MaterialIcons";
import { config } from "~/config/config";
import Text from "~/components/Text";
import * as Progress from 'react-native-progress';
import { CourseSideMenuProps } from "..";
import { t } from "~/providers/TranslationProvider";

type CourseSideMenuHeaderProps = Omit<CourseSideMenuProps, 'courseId'>

export const Header = ({ enrolled, course, navigation }: CourseSideMenuHeaderProps) => {
    return (
        <>
            <SafeAreaView edges={['top']} style={styles.topSafeArea} />
            <View>
                <View style={styles.topHeader}>
                    <View>
                        <TouchableOpacity
                            accessibilityRole='button'
                            onPress={navigation.closeDrawer}>
                            <MaterialIcons name="close" size={24} color={config.color.neutral[900]} />
                        </TouchableOpacity>
                    </View>
                    {enrolled && (
                        <>
                            <View style={styles.progressBarContainer}>
                                <Progress.Bar
                                    progress={course.progress || 0}
                                    color={config.color.neutral[900]}
                                    unfilledColor={config.color.neutral[50]}
                                    borderWidth={0}
                                    width={null}
                                    borderRadius={0}
                                />
                            </View>
                            <Text style={styles.headerText}>
                                {t('courseExecution.yourProgress') +
                                    ': ' +
                                    ((course.progress || 0) * 100).toFixed(0) +
                                    '%'}
                            </Text>
                        </>)}
                </View>
            </View>
        </>);
}