import React from "react";
import { Course } from "~/api/model";
import { styles } from "../styles";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "~/components/Text";
import FastImage from "@d11/react-native-fast-image";
import { t } from "~/providers/TranslationProvider";
import { date_to_str } from "~/api/util";
import moment from "moment";
import * as Progress from 'react-native-progress';
import { config } from "~/config/config";

export class CourseItem extends React.PureComponent<{ item: Course, onClick: () => void }> {
    render() {
        const { item, onClick } = this.props;

        const extraTextInProgress =
            t('courseInformation.startedDate') +
            ': ' +
            (item.startDate
                ? date_to_str(moment(item.startDate))
                : t('courseInformation.neverDate'));

        const extraTextCompleted =
            t('courseInformation.finishDate') +
            ': ' +
            date_to_str(moment(item.finishDate));

        return (
            <TouchableOpacity accessible={false} style={styles.itemContainer} onPress={onClick}>
                <TouchableOpacity
                    accessible={false}
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no-hide-descendants"
                    onPress={onClick}
                    style={{
                        height: '100%',
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                    }}>
                    <FastImage
                        accessibilityElementsHidden={true}
                        importantForAccessibility="no-hide-descendants"
                        accessible={false}
                        accessibilityLabel={''}
                        accessibilityHint={''}
                        accessibilityRole={'none'}
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={onClick} accessibilityRole='button'>
                        <Text style={styles.titleText} numberOfLines={2}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.extraText}>{item.progress && item.progress >= 1 ? extraTextCompleted : extraTextInProgress}</Text>
                        <View style={styles.progressBarContainer}>
                            <View style={{ flex: 1 }}>
                                <Progress.Bar
                                    progress={item.progress || 0}
                                    color={config.color.neutral[900]}
                                    unfilledColor={config.color.misc.border}
                                    borderWidth={0}
                                    width={null}
                                    borderRadius={0}
                                />
                            </View>
                            <Text style={styles.progressBarText}>
                                <Text style={styles.progressBarText}>
                                    {((item.progress || 0) * 100).toFixed(0) + '%'}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}