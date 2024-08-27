import { ColorValue, View } from "react-native";
import Text from "../Text";
import styles from "./styles";

interface AlertBannerProp {
    backgroundColor: ColorValue;
    children: React.ReactNode
}

const AlertBanner = ({ backgroundColor, children }: AlertBannerProp) => {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {children}
        </View>
    );
}

export default AlertBanner;