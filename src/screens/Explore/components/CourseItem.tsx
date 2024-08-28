import React from "react";
import { Course } from "~/api/endpoints";
import { styles } from "../styles";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "~/components/Text";
import FastImage from "@d11/react-native-fast-image";
import { InProgress } from "./InProgress";
import { Completed } from "./Completed";
import { AvailableOffline } from "./AvailableOffline";

export class CourseItem extends React.PureComponent<{ item: Course, category: string, onClick: () => void }> {
    render() {
        const { item, onClick, category } = this.props;

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
                    <View>
                        <Text style={styles.categoryText}>{category}</Text>
                        <TouchableOpacity onPress={onClick} accessibilityRole='button'>
                            <Text style={styles.titleText} numberOfLines={2}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.outerTagContainer}>
                        <View style={styles.tagContainer}>
                            {(item.progress && item.progress >= 1) && (<Completed />) || null}
                            {(item.progress && item.progress < 1) && (<InProgress />) || null}
                        </View>
                        <View style={styles.tagContainer}>
                            {(item.books && Array.isArray(item.books) && item.books.length) && (<AvailableOffline />) || null}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}