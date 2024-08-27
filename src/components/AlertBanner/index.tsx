import { ColorValue, View } from "react-native";
import Text from "../Text";

interface AlertBannerProp {
    backgroundColor: ColorValue;
    children: React.ReactNode
}

const AlertBanner = ({ backgroundColor, children }: AlertBannerProp) => {
    return (
        <View style={{ backgroundColor: backgroundColor, padding: 8 }}>
            {children}
        </View>
    );
}

export default AlertBanner;