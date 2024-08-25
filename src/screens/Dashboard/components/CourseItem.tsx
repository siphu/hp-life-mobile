import React from "react";
import { Course } from "~/api/model";
import { styles } from "../styles";
import { Image, View } from "react-native";
import Text from "~/components/Text";

export class CourseItem extends React.PureComponent<{ item: Course }> {
    render() {
        const { item } = this.props;
        return (
            <View style={styles.itemContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                />
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.status?.toString()}</Text>
                </View>
            </View>
        );
    }
}