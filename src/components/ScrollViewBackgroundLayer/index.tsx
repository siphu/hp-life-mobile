import { View } from "react-native";
import { GlobalStyles } from "~/config/styles";

interface IScrollViewBackgroundLayer {
    topBounceColor?: string;
    bottomBounceColor?: string;
}

export const ScrollViewBackgroundLayer = ({
    topBounceColor,
    bottomBounceColor,
}: IScrollViewBackgroundLayer) => (
    <View
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
        }}>
        <View style={{ flex: 1, backgroundColor: topBounceColor || GlobalStyles.header.backgroundColor }} />
        <View style={{ flex: 1, backgroundColor: bottomBounceColor || 'white' }} />
    </View>
);