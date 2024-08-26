import React from "react";
import { Course } from "~/api/model";
import { styles } from "../styles";
import { Image, View } from "react-native";
import Text from "~/components/Text";
import FastImage from "@d11/react-native-fast-image";


export class CourseItem extends React.PureComponent<{ item: Course }> {
    render() {
        const { item } = this.props;
        return (
            <View style={styles.itemContainer}>
                <FastImage
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                />
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.status?.toString()}</Text>
                    <Text>Progress: {item.progress?.toString()}</Text>
                    <Text>{item.enrollmentStatus}</Text>
                </View>
            </View>
        );
    }
}