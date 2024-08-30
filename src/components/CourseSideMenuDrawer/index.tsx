import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~/components//Text";
import { config } from "~/config/config";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";
import { styles } from "./styles";
import Images from '~/res/images';
import { MaterialIcons } from "~/components/MaterialIcons";
import React from "react";
import { Course } from "~/api/endpoints";
import { t } from "~/providers/TranslationProvider";

interface Props extends DrawerContentComponentProps {
    course: Course;
    courseId: number;
    enrolled: boolean;
}

const CourseSideMenuDrawer = ({ state, navigation, course, courseId, enrolled }: Props) => {
    return (
        <View style={GlobalStyles.flex}>
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

                    <View style={styles.hpLogoContainer}><Text style={{ fontWeight: 500, fontSize: 16 }}>{t('courseInformation.lessons')}</Text></View>
                </View>
            </View>
            <ScrollView
                accessible={false}
                accessibilityRole="menu"
                style={GlobalStyles.flex}
                showsVerticalScrollIndicator={false}>
                <Text>{JSON.stringify(course.lessons, undefined, 4)}</Text>
                <SafeAreaView edges={['bottom']} />
            </ScrollView>

        </View>);
};

export default CourseSideMenuDrawer;